import React from "react";

const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"];

export interface EndpointMethodInputProps {
  url: string;
  method: string;
  onChange: (value: { url: string; method: string }) => void;
}

export const EndpointMethodInput: React.FC<EndpointMethodInputProps> = ({
  url,
  method,
  onChange,
}) => {
    let isUrlValid = true;
    try {
        if (url.length > 0) {
            new URL(url);
        }
    } catch {
        isUrlValid = false;
    }

    return (
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <label>
            Endpoint:
            <input
            aria-label="Endpoint URL"
            type="text"
            value={url}
            placeholder="https://api.example.com/endpoint"
            onChange={(e) =>
                onChange({ url: e.target.value, method })
            }
            style={{
                borderColor: url && !isUrlValid ? "red" : undefined,
                minWidth: 250,
            }}
            />
        </label>
        <label>
            Method:
            <select
            aria-label="HTTP Method"
            value={method}
            onChange={(e) =>
                onChange({ url, method: e.target.value })
            }
            >
            {HTTP_METHODS.map((m) => (
                <option key={m} value={m}>
                {m}
                </option>
            ))}
            </select>
        </label>
        {!isUrlValid && <span style={{ color: "red" }}>Invalid URL</span>}
        </div>
    );
};

export default EndpointMethodInput;
