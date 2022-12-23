import styled from "styled-components";
import { Link } from "react-router-dom";

export const FooterContainer = styled.footer`
  background-color: #101522;
`;
export const FooterWrap = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
`;
export const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
export const FooterLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;

  @media screen and (max-width: 820px) {
    padding-top: 32px;
  }
`;

export const FooterLinksWrapper = styled.div`
  display: flex;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;
export const FooterLinkItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 16px;
  width: 160px;
  text-align: left;
  box-sizing: border-box;
  color: #fff;

  @media screen and (max-width: 820px) {
    margin: 0;
    padding: 10px;
    width: 100%;
  }
`;
export const FooterLinkTitle = styled.h1`
  font-size: 18px;
  margin-bottom: 16px;
`;
export const FooterLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  margin-bottom: 0.5rem;
  font-size: 14px;
  &:hover {
    color: #01bf71;
    transition: 0.3s ease-out;
  }
`;
export const SocialMedia = styled.section`
  max-width: 1000px;
  width: 100%;
`;
export const SocialMediaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: 5px auto 0 auto;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;
export const SocialLogo = styled(Link)`
  justify-self: start;
  color: #fff;
  margin-bottom: 16px;
  font-size: 1.5rem;
  display: flex;
  cursor: pointer;
  font-weight: bold;
  align-items: center;
`;
export const WebsiteRights = styled.small`
  color: #fff;
  margin-bottom: 16px;
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 240px;
`;
export const SocialIconLink = styled.a`
  color: #fff;
  font-size: 24px;
  margin-bottom: 10px;
`;
