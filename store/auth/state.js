export default function() {
  return {
    credit: localStorage.getItem("credit") || 0,
    role: localStorage.getItem("role") || -1,
    username: localStorage.getItem("username") || "unknown",
    user_permissions: localStorage.getItem("user_permissions") || [],
    key: localStorage.getItem("key") || "",
    gameType: {
      SL: "SLOT",
      LC: "LIVE-CASINO",
      SB: "SPORTBOOK",
      OT: "OTHERS",
      ES: "ESPORT",
      LK: "LOTTO",
      PK: "POKER",
      FH: "FISHING",
      CB: "CARD & BOARD",
      MG: "MINI GAME"
    },
    provider: {
      AB: "Allbet",
      AG: "ASIA GAMING",
      CQ: "CQ9",

      AV: "AVIA Gaming",
      CB: "CitiBet",
      DG: "Dream Gaming",
      FG: "Fun Gaming",
      FI: "Maverick",
      F5: "Maverick",
      GE: "Evolution Gaming",
      GM: "Gamatron",
      GT: "BTI",
      L4: "LIVE22",
      PG: "PG Soft",
      PR: "Pragmatic Play",
      PX: "Playtech",
      S2: "Sexy Baccarat",
      SG: "Spade Gaming",
      SO: "SBO",
      SY: "Simple Play",
      VV: "Vivo Gaming",
      WB: "Wbet",

      AM: "Ameba",
      CQ: "CQ9",
      EP: "Evoplay",
      JK: "Joker",
      SA: "SA Gaming",
      RE: "Red Tiger"
    }
  };
}
