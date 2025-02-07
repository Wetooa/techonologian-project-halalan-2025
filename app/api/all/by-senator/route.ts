import { fetchFormsData } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await fetchAllBySenator();
    return NextResponse.json({ data: result });
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function fetchAllBySenator() {
  const { data } = await fetchFormsData();
  
    const senatorList = [
    "1. ABALOS, BENHUR (PFP)",
    "2. ADONIS, JEROME (MKBYN)",
    "3. AMAD, WILSON (IND)",
    "4. ANDAMO, NARS ALYN (MKBYN)",
    "5. AQUINO, BAM (KNP)",
    "6. ARAMBULO, RONNEL (MKBYN)",
    "7. ARELLANO, ERNESTO (KTPNAN)",
    "8. BALLON, ROBERTO (IND)",
    "9. BINAY, ABBY (NPC)",
    "10. BONDOC, JIMMY (PDPLBN)",
    "11. BONG REVILLA,RAMON, JR. (LAKAS)",
    "12. BOSITA, BONIFACIO (IND)",
    "13. BROSAS, ARLENE (MKBYN)",
    "14. CABONEGRO, ROY (DPP)",
    "15. CAPUYAN, ALLEN (PPP)",
    "16. CASIÑO, TEDDY (MKBYN)",
    "17. CASTRO, TEACHER FRANCE (MKBYN)",
    "18. CAYETANO, PIA (NP)",
    "19. D'ANGELO, DAVID (BUNYOG)",
    "20. DE ALBAN,ATTORNEY ANGELO (IND)",
    "21. DE GUZMAN, KA LEODY (PLM)",
    "22. DELA ROSA, BATO (PDPLBN)",
    "23. DORINGO, NANAY MIMI (MKBYN)",
    "24. ESCOBAL, ARNEL (PM)",
    "25. ESPIRITU, LUKE (PLM)",
    "26. FLORANDA, MODY PISTON (MKBYN)",
    "27. GAMBOA, MARC LOUIE (IND)",
    "28. GO, BONG GO (PDPLBN)",
    "29. GONZALES, NORBERTO (PDSP)",
    "30. HINLO, JAYVEE (PDPLBN)",
    "31. HONASAN, GRINGO (RP)",
    "32. JOSE, RELLY JR. (KBL)",
    "33. LACSON, PING (IND)",
    "34. LAMBINO, RAUL (PDPLBN)",
    "35. LAPID, LITO (NPC)",
    "36. LEE, MANOY WILBERT (AKSYON)",
    "37. LIDASAN, AMIRAH (MKBYN)",
    "38. MARCOLETA, RODANTE (IND)",
    "39. MARCOS, IMEE R. (NP)",
    "40. MARQUEZ, NORMAN (IND)",
    "41. MARTINEZ, ERIC (IND)",
    "42. MATA, DOC MARITES (IND)",
    "43. MATULA, ATTY. SONNY (WPP)",
    "44. MAZA, LIZA (MKBYN)",
    "45. MENDOZA, HEIDI (IND)",
    "46. MONTEMAYOR, JOEY (IND)",
    "47. OLIVAR, JOSE JESSIE (IND)",
    "48. ONG, DOC WILLIE (AKSYON)",
    "49. PACQUIAO, MANNY PACMAN (PFP)",
    "50. PANGILINAN, KIKO (LP)",
    "51. QUERUBIN, ARIEL PORFIRIO (NP)",
    "52. QUIBOLOY, APOLLO (IND)",
    "53. RAMOS, DANILO (MKBYN)",
    "54. REVILLAME, WILLIE WIL (IND)",
    "55. RODRIGUEZ, ATTY. VIC (IND)",
    "56. SAHIDULLA, NUR-ANA (IND)",
    "57. SALVADOR, PHILLIP IPE (PDPLBN)",
    "58. SINGSON, MANONG CHAVIT (IND)",
    "59. SOTTO, TITO (NPC)",
    "60. TAPADO, MICHAEL BONGBONG (PM)",
    "61. TOLENTINO, FRANCIS (PFP)",
    "62. TULFO, BEN BITAG (IND)",
    "63. TULFO, ERWIN (LKSCMD)",
    "64. VALBUENA, MAR MANIBELA (IND)",
    "65. VERCELES, LEANDRO (IND)",
    "66. VILLAR, CAMILLE (NP)"
  ];

  const map = new Map();
  senatorList.forEach((senator) => map.set(senator, 0));

  data.forEach((row) => {
    row.selection.forEach((selectedSenator: string) => {
      map.set(selectedSenator, (map.get(selectedSenator) || 0) + 1);
    });
  });

  const result = Array.from(map.entries());
  return result;
}
