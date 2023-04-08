import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  InstapaperShareButton,
} from "react-share";

const ShareButton = ({ shareUrl, title }) => {
  return (
    <>
      <EmailShareButton url={shareUrl} subject={title} body={shareUrl}>
        Share via Email
      </EmailShareButton>
      <FacebookShareButton url={shareUrl} quote={title}>
        Share on Facebook
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={title}>
        Share on Twitter
      </TwitterShareButton>
      <InstapaperShareButton url={shareUrl} title={title}>
        Share on Instagram
      </InstapaperShareButton>
    </>
  );
};

export default ShareButton;
