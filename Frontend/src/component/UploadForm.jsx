import React, { useState } from "react";
import { Spinner } from "react-bootstrap";

const SubmissionForm = ({ onSubmit }) => {
  // Internal state for form fields
  const [region, setRegion] = useState("international");
  const [title, setTitle] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [isExcludeBibliography, setExcludeBibliography] = useState(true);
  const [isExcludeQuoted, setExcludeQuoted] = useState(false);
  const [isExcludeByWordCount, setExcludeByWordCount] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isExcludeByPercentage, setExcludeByPercentage] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare form data to pass to parent or server
    const formData = {
      region,
      title,
      uploadFile,
      exclusion_options: {
        isExcludeBibliography,
        isExcludeQuoted,
        isExcludeByWordCount,
        wordCount,
        isExcludeByPercentage,
        percentage,
      },
    };

    // Simulate form submission (replace with actual API call or logic)
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(formData); // Send data to parent component
    }, 1000);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
        <div className="mb-3">
          <label className="form-label">Region</label>
          <select
            className="form-select"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="international">International</option>
            <option value="local">Local</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload File</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setUploadFile(e.target.files[0])}
            required
          />
        </div>

        <div className="mb-3">
          <h5>Exclusion Options</h5>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={isExcludeBibliography}
              onChange={(e) => setExcludeBibliography(e.target.checked)}
            />
            <label className="form-check-label">Exclude Bibliography</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={isExcludeQuoted}
              onChange={(e) => setExcludeQuoted(e.target.checked)}
            />
            <label className="form-check-label">Exclude Quoted Text</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={isExcludeByWordCount}
              onChange={(e) => setExcludeByWordCount(e.target.checked)}
            />
            <label className="form-check-label">Exclude by Word Count</label>
          </div>
          {isExcludeByWordCount && (
            <div className="mt-2">
              <input
                type="number"
                className="form-control"
                placeholder="Word Count"
                value={wordCount}
                onChange={(e) => setWordCount(e.target.value)}
              />
            </div>
          )}
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={isExcludeByPercentage}
              onChange={(e) => setExcludeByPercentage(e.target.checked)}
            />
            <label className="form-check-label">Exclude by Percentage</label>
          </div>
          {isExcludeByPercentage && (
            <div className="mt-2">
              <input
                type="number"
                className="form-control"
                placeholder="Percentage"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default SubmissionForm;
