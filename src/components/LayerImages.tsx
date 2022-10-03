type LayerImagesProps = {
  files: File[];
};
export default function LayerImages({ files }: LayerImagesProps) {
  return (
    <div style={{ position: "relative", width: 512, height: 512 }}>
      {files.map((files, i) => (
        <img
          key={files.name}
          src={URL.createObjectURL(files)}
          style={{
            position: "absolute",
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
