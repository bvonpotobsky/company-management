import type {NextPage} from "next";

import {Separator} from "~/components/ui/separator";

import NewProfileForm from "~/components/new-profile-form";

const RegisterNewProfile: NextPage = () => {
  return (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">This is how others will see you on the site.</p>
      </div>
      <Separator />
      <NewProfileForm />
    </div>
  );
};

export default RegisterNewProfile;
