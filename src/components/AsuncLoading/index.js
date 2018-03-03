import loadable from "react-loadable";
import loadingComponent from "./loading";
export default function asyncLoad(AsyncComponent) {
  // 在delay时间内加载完成的异步不显示loading状态
  const delay = 600;
  // timeout
  const timeout = 3500;
  return loadable({
    loader: AsyncComponent,
    loading: loadingComponent,
    delay,
    timeout
  });
}
