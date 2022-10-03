import { UniqueIdentifier } from "@dnd-kit/core";
import type { NextPage } from "next";
import { useState } from "react";
import Dropzone from "react-dropzone";
import LayerImages from "../components/LayerImages";
import List from "../components/List";
import styles from "../styles/Home.module.css";

type Choice = {
  id: UniqueIdentifier;
  attribute: string;
  file: File;
};
const Home: NextPage = () => {
  // store uploaded files in state for diplaying
  const [filesGroupedByAttribute, setFilesGroupedByAttribute] = useState<
    Record<string, File[]>
  >({});
  const [choices, setChoices] = useState<Choice[]>([]);

  const sampleRandomChoices = (
    _filesGroupedByAttribute: Record<string, File[]>
  ) => {
    // sample random set of choices from attributes
    const newChoices: Choice[] = [];
    Object.keys(_filesGroupedByAttribute).forEach((attribute) => {
      const files = _filesGroupedByAttribute[attribute];
      const file = files[Math.floor(Math.random() * files.length)];
      newChoices.push({ attribute, file, id: attribute });
    });
    setChoices(newChoices);
  };

  const renderChoice = (choice: Choice, index: number) => {
    const { attribute, file } = choice;
    return (
      <div key={attribute} className={styles.card}>
        <h2>{attribute}</h2>
        <select
          value={file.name}
          onChange={(e) => {
            // set attribute in choice to selection
            const newChoices = [...choices];
            newChoices[index].file = filesGroupedByAttribute[attribute].find(
              (file) => file.name === e.target.value
            )!;
            setChoices(newChoices);
          }}
        >
          {filesGroupedByAttribute[attribute].map((file) => (
            <option key={file.name} value={file.name}>
              {file.name.replace(/\.[^/.]+$/, "")}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Dropzone
        onDrop={(acceptedFiles) => {
          // group files by directory path
          const newFilesGroupedByAttribute: Record<string, File[]> = {};
          acceptedFiles.forEach((file) => {
            const path: string = (file as any).path;
            // get directory path from file path
            const attribute = path.split("/").slice(2, -1).join("/");
            if (!newFilesGroupedByAttribute[attribute]) {
              newFilesGroupedByAttribute[attribute] = [];
            }
            newFilesGroupedByAttribute[attribute].push(file);
          });
          setFilesGroupedByAttribute(newFilesGroupedByAttribute);
          sampleRandomChoices(newFilesGroupedByAttribute);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className={styles.card}>
            <input {...getInputProps()} />
            <h2>Upload Folder Here</h2>
            <p>Drag folder container all traits grouped by attributes here</p>
          </div>
        )}
      </Dropzone>
      {Object.keys(filesGroupedByAttribute).length > 0 && (
        <>
          <div className={styles.card}>
            <button
              onClick={() => sampleRandomChoices(filesGroupedByAttribute)}
            >
              random
            </button>
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <List
                items={choices}
                setItems={setChoices}
                render={renderChoice}
              />
            </div>
            <div>
              <div
                className={styles.card}
                style={{
                  maxWidth: 1000,
                  backgroundColor: "white",
                  padding: "5rem",
                }}
              >
                <LayerImages files={choices.map((choice) => choice.file)} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
