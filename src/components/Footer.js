import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Box, Button, Container } from "@mui/material";
import { Email } from "@mui/icons-material";

// Components
import neople_logo from '../lib/img/neople_api_logo.png';
import kakao_logo from '../lib/img/kakao_logo.png';

const Footer = () => {

  const { isMobile } = useSelector((state) => state.dimension);

  const doCopy = text => {
    // 흐음 1.
    if (navigator.clipboard) {
      // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
      navigator.clipboard
        .writeText(text)
        .then(() => {
          window.alert("이메일주소가 복사되었습니다.");
        })
        .catch(() => {
          window.alert("복사를 다시 시도해주세요.");
        });
    } else {
      // 흐름 2.
      if (!document.queryCommandSupported("copy")) {
        return alert("복사하기가 지원되지 않는 브라우저입니다.");
      }

      // 흐름 3.
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.top = 0;
      textarea.style.left = 0;
      textarea.style.position = "fixed";

      // 흐름 4.
      document.body.appendChild(textarea);
      // focus() -> 사파리 브라우저 서포팅
      textarea.focus();
      // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
      textarea.select();
      // 흐름 5.
      document.execCommand("copy");
      // 흐름 6.
      document.body.removeChild(textarea);
      window.alert("이메일주소가 복사되었습니다.");
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{
        display: isMobile ? 'block' : 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        flexWrap: 'warp',
        gap: 1,
        p: 2,
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          p: isMobile ? 1 : 0,
        }}>
          <img
            style={{ cursor: 'pointer' }}
            src={neople_logo}
            alt="Neople 오픈 API"
            onClick={() => window.open('https://developers.neople.co.kr')}
          />
        </Box>
        <Box sx={{
          display: 'flex',
          gap: 1,
          justifyContent: 'center',
        }}>
          <Button variant="outlined" startIcon={<Email />} onClick={() => doCopy('kjhss2@nate.com')}>
            Email
          </Button>
          <Button variant="outlined" sx={{ backgroundColor: 'yellow', color: 'black' }} endIcon={
            <Avatar alt="kakao_logo" src={kakao_logo} variant="square" sx={{ width: 30, height: 30 }} />
          }
            onClick={() => window.open('https://open.kakao.com/o/s9oPR6ae')}
          >
            카카오톡
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Footer;