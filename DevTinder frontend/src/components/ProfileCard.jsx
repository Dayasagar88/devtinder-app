import React, { useState } from "react";
import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import EditProfileForm from "./EditProfileForm";
import { Badge } from "./ui/badge";


const ProfileCard = ({ user, onClose, onUpdate,loading }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedUser) => {
    onUpdate(updatedUser);
    setIsEditing(false);
  };

 return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 md:px-0 px-2">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <EditProfileForm
            loading={loading}
              user={user}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={user?.photoUrl}
                    alt={`${user?.firstName} ${user?.lastName}`}
                  />
                  <AvatarFallback>
                    {user?.firstName}
                    {user?.lastName}
                  </AvatarFallback>
                </Avatar>
                <h3 className="mt-2 text-xl font-semibold">{`${user?.firstName} ${user?.lastName}`}</h3>
                <p className="text-sm text-muted-foreground">
                  {user?.profession}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">About</h4>
                <p className="text-sm text-muted-foreground">{user?.about}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <h4 className="font-semibold mb-1">Age</h4>
                  <p className="text-sm text-muted-foreground">{user?.age}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Gender</h4>
                  <p className="text-sm text-muted-foreground">{user?.gender}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {user?.skills?.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button className="w-full" onClick={handleEditClick}>
                Edit Profile
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
