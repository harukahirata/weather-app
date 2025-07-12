type Props = {
  onClick: () => void;
};

const CurrentLocationButton = ({ onClick }: Props) => {
  return <button onClick={onClick}>現在地で調べる</button>;
};

export default CurrentLocationButton;
