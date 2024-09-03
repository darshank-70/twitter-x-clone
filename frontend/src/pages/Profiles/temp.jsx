const handleCoverInput = (e) => {
  setIsLoading(true);
  const imageUploaded = e.target.files[0];
  const formData = new FormData();
  formData.set("image", imageUploaded);
  const response = axios
    .post(
      "https://api.imgbb.com/1/upload?key=c452bc13182fbd9677158a44470747dd",
      formData
    )
    .then((response) => {
      console.log(response);
      const url = response.data.data.display_url;
      console.log(currentUser);
      // setAvatarLoading(false);
      setCoverImageUrl(url);
      const userCoverImage = {
        email: currentUser?.email,
        coverImageUrl: url,
      };
      console.log(currentUser?.email);
      axios.patch(
        `https://twitter-x-clone-vksq.onrender.com/user-updates?email=${currentUser?.email}`,
        userCoverImage
      );
      // setAvatarLoading(false);
    })
    .catch((err) => {
      // setAvatarLoading(false);
      console.log("Failed COver Upload", err);
    })
    .finally(() => setCoverLoading(false));
};
