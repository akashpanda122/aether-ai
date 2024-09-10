import { render, screen } from "@testing-library/react";

import App from "./App";
import TxMonitorComponent from "./services/transationService";
test("renders learn react link", () => {
  render(<App />);
  render(<TxMonitorComponent />);
});
