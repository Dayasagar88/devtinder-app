import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { Badge } from "./ui/badge";

const exampleSkills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "SQL",
  "TypeScript",
  "Redux",
  "Next.js",
  "Tailwind CSS",
  "Git",
  "Docker",
  "Firebase",
  "GraphQL",
  "Python",
  "Jest",
  "AWS",
  "Kubernetes",
];

const EditProfileForm = ({ user, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(",").map((skill) => skill.trim());
    setFormData((prevData) => ({ ...prevData, skills }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleExampleSkillsChange = (skill) => {
    setFormData((prevData) => {
      if (!prevData.skills.includes(skill)) {
        return {
          ...prevData,
          skills: [...prevData.skills, skill],
        };
      }
      return prevData;
    });
  };

  return (
    formData && (
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-1 text-xs">
            <Label className="md:text-normal text-xs" htmlFor="firstName">First Name</Label>
            <Input
              className="text-xs"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="md:space-y-2 space-y-1">
            <Label className="md:text-normal text-xs" htmlFor="lastName">Last Name</Label>
            <Input
              className="text-xs"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="md:space-y-2 space-y-1">
          <Label className="md:text-normal text-xs" htmlFor="profession">Profession</Label>
          <Input
            className="text-xs"
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
          />
        </div>
        <div className="md:space-y-2 space-y-1">
          <Label className="md:text-normal text-xs" htmlFor="about">About</Label>
          <Textarea
            className="text-xs md:text-normal scrollbar-hide "
            id="about"
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows={3}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="md:space-y-2 space-y-1">
            <Label className="md:text-normal text-xs" htmlFor="age">Age</Label>
            <Input
              className="text-xs"
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="md:space-y-2 space-y-1">
            <Label className="md:text-normal text-xs" htmlFor="gender">Gender</Label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="block w-full px-3 py-2 text-sm border-gray-800 rounded-md focus:outline-none focus:ring-[1.5px] focus:ring-blue-700 focus:ring-opacity-50 border "
            >
              <option disabled value="Select">
                Select
              </option>{" "}
              {/* Default placeholder */}
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Other</option>
            </select>
          </div>
        </div>
        <div className="md:space-y-2 space-y-1">
          <Label className="md:text-normal text-xs" htmlFor="skills">Skills (comma-separated)</Label>
          <Input
            className="md:text-normal text-xs"
            placeholder="Enter skills (e.g., HTML, CSS, JavaScript)"
            id="skills"
            name="skills"
            value={formData.skills.join(", ")}
            onChange={handleSkillsChange}
          />
          <div className="space-y-1 md:h-full h-20 overflow-auto scrollbar-hide ">
            {exampleSkills.map((skill, index) => (
              <Badge
                key={index}
                onClick={() => handleExampleSkillsChange(skill)}
                variant="secondary"
                className="mr-1 cursor-pointer "
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div className="md:space-y-2 space-y-1">
          <Label className="md:text-normal text-xs" htmlFor="profilePicture">Profile Picture URL</Label>
          <Input
            className="text-xs"
            id="photoUrl"
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button disabled={loading} type="submit">
            {loading ? <Loader className=" animate-spin" /> : "Save Changes"}
          </Button>
        </div>
      </form>
    )
  );
};

export default EditProfileForm;
