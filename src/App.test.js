import { render, screen } from "@testing-library/react";
// import App from "./App";
import AddPlayerForm from "./components/Form.js";

test("renders learn react link", () => {
  render(<AddPlayerForm />);
  const linkElement = screen.getByText("Submit");
  expect(linkElement).toBeInTheDocument();
});
