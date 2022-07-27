import { useParams } from "react-router-dom";
import { useEffect } from "react";

const PhotoDetail = ({ id, title, owner, secret, server_id }) => {
  let params = useParams();

  useEffect(() => {
    const imgURL = `https://live.staticflickr.com/${server_id}/${id}_${secret}_b.jpg`;
    return (
      <div className="FilmDetail is-hydrated">
        <figure className="film-backdrop">
          <img src={imgURL} alt={title} />
          <h1 className="film-title">{title}</h1>
          <h2 className="film-title">{owner}</h2>
        </figure>
      </div>
    );
  }, [params.photoId]);
};

export default PhotoDetail;
