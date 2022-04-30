function test(userType) {
  let url = "/round/{roundId}";
  if (userType == "owner" || userType == "share" || userType == "senior") {
    url = `/senior/{username}${url}`;
  }
  if (userType == "owner" || userType == "share") {
    url = `/share/{senior_user}${url}`;
  }
  if (userType == "owner") {
    url = `/owner/{share_user}${url}`;
  }
  const expect =
    "/senior/{username}/round/{roundId}";
  console.log("expect", expect);
  console.log("actual", url);
  console.log("test result", expect == url);
  return url;
}

test("senior");
