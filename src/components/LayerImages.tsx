type LayerImagesProps = {
  files: File[];
};
export default function LayerImages({ files }: LayerImagesProps) {
  return (
    <svg
      id="critterz"
      width="100%"
      height="100%"
      version="1.1"
      viewBox="0 0 512 512"
    >
      {files.map((file, i) => (
        <image
          key={file.name}
          xlinkHref={URL.createObjectURL(file)}
          style={{
            position: "absolute",
            imageRendering: "pixelated",
            height: 512,
            width: 512,
          }}
        />
      ))}
    </svg>
  );
}
