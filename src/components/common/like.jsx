import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";

const Like = ({ liked, onClick }) => {
  return (
    <span style={{ cursor: "pointer" }} onClick={onClick}>
      {liked === true ? (
        <FontAwesomeIcon icon={heartSolid} />
      ) : (
        <FontAwesomeIcon icon={heartRegular} />
      )}
    </span>
  );
};
export default Like;
