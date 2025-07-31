'use client';

interface YouTubeProps {
  id: string;
}

const YouTube: React.FC<YouTubeProps> = ({ id }) => (
  <div className="aspect-video w-full">
    <iframe
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full"
    />
  </div>
);

export default YouTube;
