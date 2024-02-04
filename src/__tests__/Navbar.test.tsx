import "@testing-library/jest-dom";
import { Navbar } from "@/components/navbar";
import { render, fireEvent } from "@testing-library/react";

describe("Page", () => {
  it("renders a heading", () => {
    const { getByText } = render(<Navbar />);

    const darkButton = getByText("Dark");
    const lightButton = getByText("Light");

    // Check if buttons are rendered
    expect(darkButton).toBeInTheDocument();
    expect(lightButton).toBeInTheDocument();
  });
});
