"use client";

import React, { useState } from "react";
import { addPost } from "@/app/actions/add-post-action";
import {
  Textarea,
  Button,
  User,
  Input,
  Avatar,
  SelectItem,
  Select,
} from "@nextui-org/react";
import { useRef } from "react";
import { ComposePostButton } from "./compse-post-button";

export function ComposeModel({}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [value, setValue] = React.useState(new Set([]));
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleAddPost = async () => {
    const formData = new FormData();
    formData.append("language", selectedLanguage);

    await addPost(formData);
  };

  return (
    <div>
      <form
        ref={formRef}
        action={async (formData) => {
          await addPost(formData);
          formRef.current?.reset();
        }}
      >
        <div className="flex flex-col m-8">
          <Input
            name="content"
            key="content"
            type="name"
            label="Name"
            placeholder="Saiko"
            description="A simple name for your model"
            className="max-w-xs mb-8"
            isRequired
          />
          <Input
            key="imageurl"
            type="imageurl"
            label="Image URL"
            placeholder="https://i.imgur.com/PUFDIUU.png"
            description="We recommend a square image in good quality"
            className="max-w-xs mb-8"
            isRequired
            name="image_url"
          />
          <Input
            key="link"
            type="link"
            label="Link"
            placeholder="Model URL."
            description="We recommend Google Drive or Hugginface"
            className="max-w-xs mb-8"
            isRequired
            name="model_url"
          />
          <Input
            key="epochs"
            name="epochs"
            type="number"
            label="Epochs"
            placeholder="500"
            className="max-w-xs mb-8"
            description="The number of epochs that the model will be trained for"
            isRequired
          />
                      <Select
            isRequired
            label="Algorithm"
            placeholder="With which algorithm this model was created"
            className="max-w-xs mb-8"
            name="algorithm"
            >
            <SelectItem key="Rvmpe" value="Rvmpe">
                Rvmpe
            </SelectItem>
            <SelectItem key="Harvest" value="Harvest">
                Harvest
            </SelectItem>
            <SelectItem key="PM" value="PM">
                PM
            </SelectItem>
            <SelectItem key="Dio" value="Dio">
                Dio
            </SelectItem>
            <SelectItem key="Crepe" value="Crepe">
                Crepe
            </SelectItem>
            <SelectItem key="Crepe-tiny" value="Crepe-tiny">
                Crepe-tiny
            </SelectItem>
            <SelectItem key="Mangio-crepe" value="Mangio-crepe">
                Mangio-crepe
            </SelectItem>
            </Select>
            <Select
            isRequired
            label="Type"
            placeholder="Select the technology here "
            className="max-w-xs"
            name="version"
            >
            <SelectItem key="RVC V2" value="RVC V2">
                RVC V2
            </SelectItem>
            <SelectItem key="RVC V1" value="RVC V1">
                RVC V1
            </SelectItem>
            <SelectItem key="SVC" value="SVC">
                SVC
            </SelectItem>
            </Select>
          <div className="w-72 mb-8">

          </div>
          <div className="w-72 mb-8">

          </div>
          <ComposePostButton />
        </div>
      </form>
    </div>
  );
}