import React, { useState } from "react";
import { Spinner, Form, Button } from "react-bootstrap";

const SubmissionForm = ({ onClose }) => {
  const [region, setRegion] = useState("international");
  const [title, setTitle] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [exclusionOptions, setExclusionOptions] = useState({
    isExcludeBibliography: true,
    isExcludeQuoted: false,
    isExcludeByWordCount: false,
    isExcludeByPercentage: false,
    wordCount: 0,
    percentage: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare form data
    const formData = new FormData();
    formData.append("region", region);
    formData.append("title", title);
    formData.append("uploadFile", uploadFile);
    formData.append("exclusion_options", JSON.stringify(exclusionOptions));

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      onClose(); // Close the modal after submission
    }, 1000);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Region</Form.Label>
        <Form.Select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="international">International</option>
          <option value="local">Local</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Upload File</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setUploadFile(e.target.files[0])}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Exclusion Options</Form.Label>
        <Form.Check
          type="checkbox"
          label="Exclude Bibliography"
          checked={exclusionOptions.isExcludeBibliography}
          onChange={(e) =>
            setExclusionOptions({
              ...exclusionOptions,
              isExcludeBibliography: e.target.checked,
            })
          }
        />
        <Form.Check
          type="checkbox"
          label="Exclude Quoted Text"
          checked={exclusionOptions.isExcludeQuoted}
          onChange={(e) =>
            setExclusionOptions({
              ...exclusionOptions,
              isExcludeQuoted: e.target.checked,
            })
          }
        />
        <Form.Check
          type="checkbox"
          label="Exclude by Word Count"
          checked={exclusionOptions.isExcludeByWordCount}
          onChange={(e) =>
            setExclusionOptions({
              ...exclusionOptions,
              isExcludeByWordCount: e.target.checked,
            })
          }
        />
        {exclusionOptions.isExcludeByWordCount && (
          <Form.Control
            type="number"
            placeholder="Word Count"
            value={exclusionOptions.wordCount}
            onChange={(e) =>
              setExclusionOptions({
                ...exclusionOptions,
                wordCount: e.target.value,
              })
            }
          />
        )}
        <Form.Check
          type="checkbox"
          label="Exclude by Percentage"
          checked={exclusionOptions.isExcludeByPercentage}
          onChange={(e) =>
            setExclusionOptions({
              ...exclusionOptions,
              isExcludeByPercentage: e.target.checked,
            })
          }
        />
        {exclusionOptions.isExcludeByPercentage && (
          <Form.Control
            type="number"
            placeholder="Percentage"
            value={exclusionOptions.percentage}
            onChange={(e) =>
              setExclusionOptions({
                ...exclusionOptions,
                percentage: e.target.value,
              })
            }
          />
        )}
      </Form.Group>

      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? (
          <Spinner as="span" animation="border" size="sm" />
        ) : (
          "Submit"
        )}
      </Button>
    </Form>
  );
};

export default SubmissionForm;
