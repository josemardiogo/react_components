interface Props {
  text: string;
  bg_color?: string;
  click: () => void;
}

const Button = ({ text, click, bg_color = "primary" }: Props) => {
  return (
    <button type="button" className={`btn btn-${bg_color}`} onClick={click}>
      {text}
    </button>
  );
};

export default Button;
