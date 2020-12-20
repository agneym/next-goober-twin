import tw, { styled } from "twin.macro";

const Container = styled.button(({ styleType }) => [
  tw`px-2 py-2 transform`,
  styleType === "primary" && tw`bg-blue-600 text-white`,
  styleType === "secondary" && tw`bg-yellow-400 text-gray-800`,
  tw`hover:(shadow-md -translate-y-1)`,
]);

function Button({ children, href, ...rest }) {
  return (
    <a href={href} target="_blank">
      <Container {...rest}>{children}</Container>
    </a>
  );
}

export default Button;
