export default function () {
  return {
    profile: JSON.parse(localStorage.getItem('profile')) || null,
    isClone: false,
    groups: null,
    credit: null,
    webPalette: {
      logo: '',
      palette: {
        darkApp: {
          menu: {
            navberColor: { label: 'สีพื้นหลัง navber ข้างบน', type: 'color', value: '#1A1426' },
            sidebarColor: {
              label: 'สีพื้นหลัง sidebar ด้านข้าง',
              type: 'color',
              value: '#1F1D31',
            },
            bgColor: {
              label: 'สีพื้นหลัง Background',
              type: 'color',
              value: '#28243d',
            },
            textColor: {
              label: 'สีตัวอักษร web',
              type: 'color',
              value: '#ffffff',
            },
            activeMenuColor: {
              label: 'สีตอนกดปุ่ม menu',
              type: 'color',
              value: '#9155fd',
            },
          },
          card: {
            cardBgColor: { label: 'สี card', type: 'color', value: '#1F1D31' },
            cardTextColor: { label: 'สีตัวอักษรใน card', type: 'color', value: '#E9E9E9' },
          },

          table: {
            colorTable: { label: 'สีหัวตาราง', type: 'color', value: '#1E1E1E' },
            colorBodyTable: { label: 'สีในตัวตาราง', type: 'color', value: '#1E1E1E' },
            colorTextTable: { label: 'สีตัวอักษรในตาราง', type: 'color', value: '#FFFFFF' },
            bgTable: { label: 'สีพื้นหลังตาราง', type: 'color', value: '#1f1d31' },
          },
        },
        lightApp: {
          menu: {
            navberColor: { label: 'สีพื้นหลัง navber ข้างบน', type: 'color', value: '#FFFFFF' },
            sidebarColor: {
              label: 'สีพื้นหลัง sidebar ด้านข้าง',
              type: 'color',
              value: '#1f1d31',
            },
            bgColor: {
              label: 'สีพื้นหลัง Background',
              type: 'color',
              value: '#f4f5fa',
            },
            textColor: {
              label: 'สีตัวอักษร web',
              type: 'color',
              value: '#000000',
            },
            activeMenuColor: {
              label: 'สีตอนกดปุ่ม menu',
              type: 'color',
              value: '#9155fd',
            },
          },
          card: {
            cardBgColor: { label: 'สี card', type: 'color', value: '#FFFFFF' },
            cardTextColor: { label: 'สีตัวอักษรใน card', type: 'color', value: '#000000' },
          },

          table: {
            colorTable: { label: 'สีหัวตาราง', type: 'color', value: '#FFFFFF' },
            colorBodyTable: { label: 'สีในตัวตาราง', type: 'color', value: '#FFFFFF' },
            colorTextTable: { label: 'สีตัวอักษรในตาราง', type: 'color', value: '#000000' },
            bgTable: { label: 'สีพื้นหลังตาราง', type: 'color', value: '#FFFFFF' },
          },
        },
      },
    },
  }
}
