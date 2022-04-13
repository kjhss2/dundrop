import React from "react";
import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const guides = [
  { src: require('../lib/img/guide/guide1.JPG'), alt: '가이드1', desc: '1. 홈 화면 입니다. 캐릭터 검색 메뉴를 클릭해 주세요.' },
  { src: require('../lib/img/guide/guide2.JPG'), alt: '가이드2', desc: '2. 캐릭터 검색 화면입니다. 캐릭터명을 입력 후 검색하여 캐릭터를 선택해 주세요.' },
  { src: require('../lib/img/guide/guide3.JPG'), alt: '가이드3', desc: '3. TAG 검색 화면입니다. 원하시는 필터를 선택하시고 검색 버튼을 클릭하시면 조회가 됩니다.' },
  { src: require('../lib/img/guide/guide4.JPG'), alt: '가이드4', desc: '4. TAG 선택창 입니다. 원하시는 TAG를 선택하시면 TAG 아이템이 조회됩니다.' },
  { src: require('../lib/img/guide/guide5.JPG'), alt: '가이드5', desc: '5. TAG로 조회된 화면입니다. 아이템목록이 출력되고 선택한 TAG가 굵은글씨로 표시됩니다. 현재 캐릭터가 보유중인 아이템은 보유중 표시가 됩니다.' },
  { src: require('../lib/img/guide/guide6.JPG'), alt: '가이드6', desc: '6. TAG는 1개 이상 선택 가능합니다. 만약 #화상, #화속성 강화 TAG를 선택하시면 둘 다 해당되는 아이템이 조회 됩니다.' },
  { src: require('../lib/img/guide/guide7.JPG'), alt: '가이드7', desc: '7. 장비유형 필터를 선택 하시면 선택하신 부위만 조회 됩니다.' },
  { src: require('../lib/img/guide/guide8.JPG'), alt: '가이드8', desc: '8. 보유 아이템 전체 시트 메뉴입니다. 해당 메뉴는 캐릭터가 보유중인 아이템을 한 눈에 보실 수 있는 메뉴입니다. 현재 캐릭터가 보유중인 아이템이라면 진하게, 보유하지 않는 아이템 이라면 흐리게 표시됩니다.' },
  { src: require('../lib/img/guide/guide9.JPG'), alt: '가이드9', desc: '9. TAG를 선택하시면 선택하신 TAG의 아이템 목록만 조회 됩니다.' },
  { src: require('../lib/img/guide/guide10.JPG'), alt: '가이드10', desc: '10. 아이템 아이콘에 마우스를 가져다 되시면 아이템명과 간단한 드랍 정보가 출력됩니다. 아이콘을 클릭하시면 해당 아이템의 상세 정보창이 나타납니다.' },
  { src: require('../lib/img/guide/guide11.JPG'), alt: '가이드11', desc: '11. 클릭한 아이템의 상세 정보창입니다. 닫기 버튼을 클릭하시거나 검은색 부분을 클릭하시면 닫힙니다.' },
  { src: require('../lib/img/guide/guide12.JPG'), alt: '가이드12', desc: '12. 아이템 획득 이력입니다. 캐릭터가 획득한 아이템 이력이 출력됩니다.' },
  { src: require('../lib/img/guide/guide13.JPG'), alt: '가이드13', desc: '13. 캐릭터가 장착중인 아이템 TAG 요약이 표시 됩니다. 보유한 TAG가 많은 순서대로 정렬됩니다.' },
  { src: require('../lib/img/guide/guide14.JPG'), alt: '가이드14', desc: '14. 보유 아이템 전체 시트 신규 기능입니다. 보유한 아이템의 전체 TAG 요약이 표시됩니다. TAG가 많은 순서대로 정렬되어 세팅하시는데 참고하시면 됩니다. TAG 요약 숨기기 버튼을 누르면 보유 아이템 TAG 요약이 숨김 처리 됩니다.' },
  { src: require('../lib/img/guide/guide15.JPG'), alt: '가이드15', desc: '15. 장착 아이템 탭 입니다. 현재 캐릭터가 장착중인 아이템 목록과 105레벨 아이템의 경우 피해증가/버프/성장 레벨이 표시됩니다.' },
  { src: require('../lib/img/guide/guide16.JPG'), alt: '가이드16', desc: '16. 다중 캐릭터 선택 기능에 대해 설명 드리겠습니다. 다중 캐릭터는 최대 4개 까지 선택가능하며 선택한 캐릭터들의 TAG검색 화면에서 아이템을 검색하면 다중 캐릭터에 등록된 캐릭터별 아이템 획득이력 여부가 표시 됩니다.' },
  { src: require('../lib/img/guide/guide17.JPG'), alt: '가이드17', desc: '17. 다중 캐릭터를 지정후 아무 캐릭터를 선택 후 TAG검색 메뉴에서 아이템명을 검색하시면 다중 캐릭터를 지정한 캐릭별로 아이템 획득이력 여부가 표시 됩니다. 획득한 이력이 존재하면 연두색, 획득한 이력이 존재하지 않으면 회색으로 표시됩니다.' },
];

const Guide = () => {

  const { width } = useSelector((state) => state.dimension);
  const imgWidth = width * 0.5;

  return (
    <ImageList
      sx={{
      }}
    >
      <ImageListItem>
        {
          guides.map(guide => (
            <Box sx={{
              marginBottom: 2
            }}
              key={guide.alt}>
              <img
                src={guide.src}
                alt={guide.alt}
                width={imgWidth}
              />
              <Typography variant="h5">{guide.desc}</Typography>
            </Box>
          ))
        }
      </ImageListItem>
    </ImageList>
  );
};

export default Guide;