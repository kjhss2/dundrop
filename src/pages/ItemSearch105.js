import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

// Components
import SearchComponent from "../components/SearchComponent";
import SearchItems from "../components/SearchItems";

const ItemSearch105 = () => {

  const { searchItems105 } = useSelector((state) => state.itemSearchState);

  return (
    <>
      <SearchComponent />
      <SearchItems items={searchItems105} />
      <Box sx={{
        gap: 1,
        marginTop: 6
      }}>
        <Typography variant="body1" color="text.primary">
          {'무기는 제외하였습니다.'} &nbsp;
        </Typography>
        <Typography variant="body1" color="text.primary">
          {'던파공홈 언제나우린☆님 게시글 내용을 참고 하였습니다.'}
          <a
            href={'https://df.nexon.com/df/community/dnfboard?mode=view&no=2637550&job=99&grow_type=0#comment_050500000000000000000'}
            target="_blank"
            rel="noopener noreferrer">
            출처링크
          </a>
        </Typography>
      </Box>
    </>
  );
};

export default ItemSearch105;