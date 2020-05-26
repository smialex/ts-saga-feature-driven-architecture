import { eventChannel } from "redux-saga";
import { take, put, race, call, fork } from "redux-saga/effects";
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER } from "./types";
import { TRegisterAction, setAuthorized } from "./actions";
import * as auth from "../AuthApi";
import { startLoading, stoptLoading } from "../../loader";
import { showNotification } from "../../notifications";
import { AuthService } from "../AuthService";

function* authorize({
  username,
  password,
  isRegistering,
}: {
  username: string;
  password: string;
  isRegistering: boolean;
}) {
  yield put(startLoading());

  let response: auth.ILoginTokenResult | auth.IRegisterResult;

  try {
    if (isRegistering) {
      response = yield call(auth.register, username, password);
    } else {
      response = yield call(auth.login, username, password);
    }

    return response;
  } catch (error) {
    yield put(
      showNotification({
        type: "error",
        message: error && error.message,
      })
    );
    return false;
  } finally {
    yield put(stoptLoading());
  }
}

function* logout() {
  yield put(startLoading());

  try {
    const response = yield call(auth.logout);
    return response;
  } catch (error) {
    yield put(
      showNotification({
        type: "error",
        message: error && error.message,
      })
    );
  } finally {
    yield put(stoptLoading());
  }
}

function* loginFlow() {
  while (true) {
    const request = yield take(AUTH_LOGIN);
    const { username, password } = request;

    const winner = yield race({
      auth: call(authorize, { username, password, isRegistering: false }),
      logout: take(AUTH_LOGOUT),
    });

    if (winner.auth) {
      const { accessToken, refreshToken } = winner.auth as auth.ILoginTokenResult;
      yield call({ context: AuthService, fn: AuthService.setTokensPair }, accessToken, refreshToken);
      //forwardTo("/dashboard"); // Go to dashboard page
    }
  }
}

function* logoutFlow() {
  while (true) {
    yield take(AUTH_LOGOUT);

    yield call(logout);
    yield call({ context: AuthService, fn: AuthService.resetTokens });
    //forwardTo("/");
  }
}

function* registerFlow() {
  while (true) {
    const { username, password }: TRegisterAction = yield take(AUTH_REGISTER);

    const wasSuccessful = yield call(authorize, { username, password, isRegistering: true });

    if (wasSuccessful) {
      //yield put({ type: SET_AUTH, newAuthState: true });
      //yield put({ type: CHANGE_FORM, newFormState: { username: "", password: "" } });
      //forwardTo("/dashboard");
    }
  }
}

function initAuthServiceChannel() {
  return eventChannel((emitter) => {
    const onChangeTokens = () => {
      const accessToken = AuthService.getAccessToken();
      const refreshToken = AuthService.getRefreshToken();
      emitter({ accessToken, refreshToken });
    };

    AuthService.subscribe(onChangeTokens);

    return () => {
      AuthService.unsubscribe(onChangeTokens);
    };
  });
}

function* authChanel() {
  const chan = yield call(initAuthServiceChannel);
  try {
    while (true) {
      const { accessToken, refreshToken }: { accessToken: string | null; refreshToken: string | null } = yield take(
        chan
      );

      const isAuthorized = accessToken !== null && refreshToken !== null;
      yield put(setAuthorized(isAuthorized));
    }
  } catch (e) {
    console.log(e);
  } finally {
  }
}

export function* authSaga() {
  yield fork(loginFlow);
  yield fork(logoutFlow);
  yield fork(registerFlow);
  yield fork(authChanel);
}
