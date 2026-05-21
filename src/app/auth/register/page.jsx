"use client";
import { useState } from "react";
import { register } from "@/lib/api/auth";
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [externalLinks, setExternalLinks] = useState([
  { host: "", link: "" }
]);
  const [role, setRole] = useState("participant");
  const [photoUrl, setphotoUrl] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const addExternalLink = () => {
  setExternalLinks([
    ...externalLinks,
    { host: "", link: "" }
  ]);
};
const updateExternalLink = (index, field, value) => {
  const updated = [...externalLinks];

  updated[index][field] = value;

  setExternalLinks(updated);
};

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      const linksObject = {};

        externalLinks.forEach((item) => {
          if (item.host && item.link) {
            linksObject[item.host] = item.link;
          }
        });

        formData.set(
          "external_links",
          JSON.stringify(linksObject)
        );
        const result = await register(formData);
        if (result.success) {
          window.location.href = "/";
        } else {
          setError(result.message || "something went wrong");
        }

    } catch (err) {
      setError("Can not connect to the server");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <button type="button" onClick={() => window.location.href = "/auth/login"}>Login</button>
      </div>
      <div>
        <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="participant">Participant</option>
          <option value="speaker">Speaker</option>
        </select>
      </div>
      {
        role?(
            <div>
                <label>
                    Email:
                    <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input name="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "Hide" : "Show"} Password
                    </button>
                </label>
                <label>
                    Full Name:
                    <input name="full_name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} {...role === "speaker" ? { required: true } : null} />
                </label>
                {
                    role === "speaker" && (
                        <>
                            <label>
                                Bio:
                                <textarea name="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio (for speakers)" />
                            </label>
                            <h3>External Links</h3>

                            {
                              externalLinks.map((item, index) => (
                                <div key={index}>
                                  <input
                                    type="text"
                                    placeholder="Host (github, linkedin...)"
                                    value={item.host}
                                    onChange={(e) =>
                                      updateExternalLink(index, "host", e.target.value)
                                    }
                                  />

                                  <input
                                    type="url"
                                    placeholder="https://..."
                                    value={item.link}
                                    onChange={(e) =>
                                      updateExternalLink(index, "link", e.target.value)
                                    }
                                  />
                                </div>
                              ))
                            }

                            <button
                              type="button"
                              onClick={addExternalLink}
                            >
                              Add Link
                            </button>
                            <label>
                                Profile Picture:
                                <input name="photo_url" type="file" accept=".png, .jpg, .jpeg, .jfif" onChange={(e) => setphotoUrl(e.target.files[0])} />
                            </label>
                        </>
                    )
                }
            </div>
        ):(
            <p>Please select a role to see the registration form.</p>
        )
      }
      <button type="submit">Register</button>
    </form>
  );
}
