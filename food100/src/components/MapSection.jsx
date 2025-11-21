export default function MapSection() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6142424.709828714!2d59.32756444008089!3d41.26031004589583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b20a5d676b1%3A0xca0a6dad7e841e20!2sUzbekistan!5e0!3m2!1sen!2s!4v1763558365678!5m2!1sen!2s"
        width="100%"
        height="400"
        className="border-0 rounded"
        loading="lazy"
        title="map"
        allowFullScreen
      ></iframe>
    </div>
  );
}