import React from "react";

type Props = {
  onClose: () => void;
};

const Component: React.FC<Props> = (props) => {
  const { onClose } = props;
  return (
    <div>
      <div>hoge</div>
    </div>
  );
};

export default Component;
