/* eslint-disable react/prop-types */
import "./VerifyDeleting.scss";

const VerifyDeleting = ({
  verifyDeleting,
  setVerifyModal,
  mainText,
  verifyingText,
  cancelingText,
  darkBg,
}) => {
  return (
    <div
      style={{
        background: darkBg ? "rgba(0, 0, 0, 0.534)" : "rgba(0, 0, 0, 0.057)",
      }}
      className="cancel-modal"
    >
      <div className="cancel-wrapper">
        <div className="cancel-start">
          <p>{mainText}</p>
        </div>
        <div className="cancel-end">
          <button onClick={() => verifyDeleting()}>{verifyingText}</button>
          <button onClick={() => setVerifyModal(false)}>{cancelingText}</button>
        </div>
      </div>
    </div>
  );
};

export default VerifyDeleting;
