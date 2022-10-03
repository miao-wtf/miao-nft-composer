type LayerImagesProps = {
  files: File[];
};
export default function LayerImages({ files }: LayerImagesProps) {
  return (
    <div style={{ position: "relative" }}>
      {files.map((files, i) => (
        <img
          key={files.name}
          src={URL.createObjectURL(files)}
          style={{
            position: i ? "absolute" : "relative",
            imageRendering: "pixelated",
            width: 512,
            bottom: 0,
            left: 0,
          }}
        />
      ))}
    </div>
  );
}
