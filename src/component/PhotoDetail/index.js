import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;

const PhotoDetail = () => {
  const params = useParams();
  const [detail, setDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${API_KEY}&photo_id=${params.photoId}&format=json&nojsoncallback=1`
    )
      .then((res) => res.json())
      .then((detail) => {
        setDetail(detail.photo);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [params.photoId]);

  return !isLoading && detail ? (
    <>
      <img
        src={`https://live.staticflickr.com/${detail.server}/${detail.id}_${detail.secret}_w.jpg`}
        alt={detail.title}
        loading="lazy"
      />
      <p>
        <strong>Author:</strong> {detail.owner.realname}
      </p>
      <p>
        <strong>Title: </strong>
        {detail.title._content}
      </p>
      <p style={{ textAlign: "left" }}>
        <strong>Description: </strong>
        {detail.description._content}
      </p>
    </>
  ) : (
    <p>Loading detail...</p>
  );
};

export default PhotoDetail;
