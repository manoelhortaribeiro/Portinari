var display = {
        '-1': {'text': 'Did not return', 'color': '#17719e'},
        '16036': {'text': 'Cyt: Low-grade,Cancer', 'color': '#CA5A49'},
        '11016': {'text': 'HPV+,Cyt: Low-grade', 'color': '#EC6CF3'},
        '25025033': {'text': 'Hist: Normal,Hist: Normal,Hist: Irregular', 'color': '#13EB2C'},
        '15031031031': {'text': 'Cyt: Normal,Hist: High-Grade,Hist: High-Grade,Hist: High-Grade', 'color': '#2BE97B'},
        '12016025': {'text': 'HPV-,Cyt: Low-grade,Hist: Normal', 'color': '#A1220C'},
        '12012': {'text': 'HPV-,HPV-', 'color': '#BE8E82'},
        '12012018025': {'text': 'HPV-,HPV-,Cyt: High-grade,Hist: Normal', 'color': '#765C81'},
        '12016': {'text': 'HPV-,Cyt: Low-grade', 'color': '#A589AC'},
        '12031036': {'text': 'HPV-,Hist: High-Grade,Cancer', 'color': '#A7124E'},
        '15025033': {'text': 'Cyt: Normal,Hist: Normal,Hist: Irregular', 'color': '#54136B'},
        '12025': {'text': 'HPV-,Hist: Normal', 'color': '#EB30A3'},
        '31036': {'text': 'Hist: High-Grade,Cancer', 'color': '#D0C123'},
        '12016031031': {'text': 'HPV-,Cyt: Low-grade,Hist: High-Grade,Hist: High-Grade', 'color': '#20BFBF'},
        '11018025025': {'text': 'HPV+,Cyt: High-grade,Hist: Normal,Hist: Normal', 'color': '#E96C17'},
        '11011031031': {'text': 'HPV+,HPV+,Hist: High-Grade,Hist: High-Grade', 'color': '#58937D'},
        '11012': {'text': 'HPV+,HPV-', 'color': '#582814'},
        '11012025031031': {'text': 'HPV+,HPV-,Hist: Normal,Hist: High-Grade,Hist: High-Grade', 'color': '#B7954E'},
        '12018033': {'text': 'HPV-,Cyt: High-grade,Hist: Irregular', 'color': '#E438DF'},
        '18025031': {'text': 'Cyt: High-grade,Hist: Normal,Hist: High-Grade', 'color': '#56857C'},
        '18031031036': {'text': 'Cyt: High-grade,Hist: High-Grade,Hist: High-Grade,Cancer', 'color': '#CB7177'},
        '12018025031': {'text': 'HPV-,Cyt: High-grade,Hist: Normal,Hist: High-Grade', 'color': '#223162'},
        '11011031': {'text': 'HPV+,HPV+,Hist: High-Grade', 'color': '#B41757'},
        '18031031031': {'text': 'Cyt: High-grade,Hist: High-Grade,Hist: High-Grade,Hist: High-Grade', 'color': '#476881'},
        '11012025025': {'text': 'HPV+,HPV-,Hist: Normal,Hist: Normal', 'color': '#CFE330'},
        '31031031031': {'text': 'Hist: High-Grade,Hist: High-Grade,Hist: High-Grade,Hist: High-Grade', 'color': '#9DC02D'},
        '15015025': {'text': 'Cyt: Normal,Cyt: Normal,Hist: Normal', 'color': '#DC4442'},
        '12012036': {'text': 'HPV-,HPV-,Cancer', 'color': '#075BBA'},
        '16016': {'text': 'Cyt: Low-grade,Cyt: Low-grade', 'color': '#2FA994'},
        '11016025025': {'text': 'HPV+,Cyt: Low-grade,Hist: Normal,Hist: Normal', 'color': '#B75715'},
        '11012018': {'text': 'HPV+,HPV-,Cyt: High-grade', 'color': '#4DD993'},
        '18025031031': {'text': 'Cyt: High-grade,Hist: Normal,Hist: High-Grade,Hist: High-Grade', 'color': '#F19FF5'},
        '33036': {'text': 'Hist: Irregular,Cancer', 'color': '#345B2F'},
        '31031033': {'text': 'Hist: High-Grade,Hist: High-Grade,Hist: Irregular', 'color': '#E0D70B'},
        '12018031031036': {'text': 'HPV-,Cyt: High-grade,Hist: High-Grade,Hist: High-Grade,Cancer', 'color': '#93573D'},
        '11012012015': {'text': 'HPV+,HPV-,HPV-,Cyt: Normal', 'color': '#96B061'},
        '11016033': {'text': 'HPV+,Cyt: Low-grade,Hist: Irregular', 'color': '#AE4B74'},
        '12031031031': {'text': 'HPV-,Hist: High-Grade,Hist: High-Grade,Hist: High-Grade', 'color': '#118E7E'},
        '12012019': {'text': 'HPV-,HPV-,Cyt: AGUS/ACIS', 'color': '#AB2836'},
        '16025031': {'text': 'Cyt: Low-grade,Hist: Normal,Hist: High-Grade', 'color': '#937924'},
        '11011': {'text': 'HPV+,HPV+', 'color': '#6B3BFB'},
        '12025025': {'text': 'HPV-,Hist: Normal,Hist: Normal', 'color': '#36931F'},
        '19031031': {'text': 'Cyt: AGUS/ACIS,Hist: High-Grade,Hist: High-Grade', 'color': '#91491B'},
        '18031031031031': {
            'text': 'Cyt: High-grade,Hist: High-Grade,Hist: High-Grade,Hist: High-Grade,Hist: High-Grade',
            'color': '#93098F'
        },
        '12019031': {'text': 'HPV-,Cyt: AGUS/ACIS,Hist: High-Grade', 'color': '#61B582'},
        '12012031': {'text': 'HPV-,HPV-,Hist: High-Grade', 'color': '#65BF67'},
        '12019': {'text': 'HPV-,Cyt: AGUS/ACIS', 'color': '#1F7CB6'},
        '31031036': {'text': 'Hist: High-Grade,Hist: High-Grade,Cancer', 'color': '#FE9EEA'},
        '12018031031': {'text': 'HPV-,Cyt: High-grade,Hist: High-Grade,Hist: High-Grade', 'color': '#938969'},
        '19': {'text': 'Cyt: AGUS/ACIS', 'color': '#67F9A8'},
        '13015025': {'text': 'HPV?,Cyt: Normal,Hist: Normal', 'color': '#17439C'},
        '16025033': {'text': 'Cyt: Low-grade,Hist: Normal,Hist: Irregular', 'color': '#E28C73'},
        '11018': {'text': 'HPV+,Cyt: High-grade', 'color': '#AEE676'},
        '12016033': {'text': 'HPV-,Cyt: Low-grade,Hist: Irregular', 'color': '#E8367A'},
        '11012015': {'text': 'HPV+,HPV-,Cyt: Normal', 'color': '#AE8E93'},
        '12018': {'text': 'HPV-,Cyt: High-grade', 'color': '#92874B'},
        '11012015031': {'text': 'HPV+,HPV-,Cyt: Normal,Hist: High-Grade', 'color': '#D55163'},
        '12015018018': {'text': 'HPV-,Cyt: Normal,Cyt: High-grade,Cyt: High-grade', 'color': '#BABD36'},
        '19031033': {'text': 'Cyt: AGUS/ACIS,Hist: High-Grade,Hist: Irregular', 'color': '#1A1C62'},
        '11018025': {'text': 'HPV+,Cyt: High-grade,Hist: Normal', 'color': '#AEA371'},
        '31033': {'text': 'Hist: High-Grade,Hist: Irregular', 'color': '#1AFE70'},
        '11011011015': {'text': 'HPV+,HPV+,HPV+,Cyt: Normal', 'color': '#2B3C24'},
        '12019031031': {'text': 'HPV-,Cyt: AGUS/ACIS,Hist: High-Grade,Hist: High-Grade', 'color': '#F8F974'},
        '15015025025': {'text': 'Cyt: Normal,Cyt: Normal,Hist: Normal,Hist: Normal', 'color': '#940843'},
        '12025031031': {'text': 'HPV-,Hist: Normal,Hist: High-Grade,Hist: High-Grade', 'color': '#58FC6C'},
        '25036': {'text': 'Hist: Normal,Cancer', 'color': '#073D84'},
        '12012025031031': {'text': 'HPV-,HPV-,Hist: Normal,Hist: High-Grade,Hist: High-Grade', 'color': '#88BB2F'},
        '11015': {'text': 'HPV+,Cyt: Normal', 'color': '#7B8CEF'},
        '11012025': {'text': 'HPV+,HPV-,Hist: Normal', 'color': '#208662'},
        '16031036': {'text': 'Cyt: Low-grade,Hist: High-Grade,Cancer', 'color': '#E1778C'},
        '12016025031': {'text': 'HPV-,Cyt: Low-grade,Hist: Normal,Hist: High-Grade', 'color': '#C77B9E'},
        '12015033': {'text': 'HPV-,Cyt: Normal,Hist: Irregular', 'color': '#E028AC'},
        '12012018025031': {'text': 'HPV-,HPV-,Cyt: High-grade,Hist: Normal,Hist: High-Grade', 'color': '#CAC3A2'},
        '25031': {'text': 'Hist: Normal,Hist: High-Grade', 'color': '#46805B'},
        '18025036': {'text': 'Cyt: High-grade,Hist: Normal,Cancer', 'color': '#F59CCE'},
        '11031': {'text': 'HPV+,Hist: High-Grade', 'color': '#256CC6'},
        '11012018031031': {'text': 'HPV+,HPV-,Cyt: High-grade,Hist: High-Grade,Hist: High-Grade', 'color': '#03A3ED'},
        '11023': {'text': 'HPV+,Cyt: Metastasis', 'color': '#3ADDDE'},
        '18025033': {'text': 'Cyt: High-grade,Hist: Normal,Hist: Irregular', 'color': '#CA0CE0'},
        '15025031031': {'text': 'Cyt: Normal,Hist: Normal,Hist: High-Grade,Hist: High-Grade', 'color': '#9947F2'},
        '13016': {'text': 'HPV?,Cyt: Low-grade', 'color': '#2B4CAB'},
        '12012033': {'text': 'HPV-,HPV-,Hist: Irregular', 'color': '#CCDB89'},
        '18031031': {'text': 'Cyt: High-grade,Hist: High-Grade,Hist: High-Grade', 'color': '#41C1EE'},
        '12019025025': {'text': 'HPV-,Cyt: AGUS/ACIS,Hist: Normal,Hist: Normal', 'color': '#E778B9'},
        '18031': {'text': 'Cyt: High-grade,Hist: High-Grade', 'color': '#F98EFA'},
        '15025036': {'text': 'Cyt: Normal,Hist: Normal,Cancer', 'color': '#CA797F'},
        '19025025': {'text': 'Cyt: AGUS/ACIS,Hist: Normal,Hist: Normal', 'color': '#9BA4C3'},
        '25025031': {'text': 'Hist: Normal,Hist: Normal,Hist: High-Grade', 'color': '#8622B3'},
        '12025031': {'text': 'HPV-,Hist: Normal,Hist: High-Grade', 'color': '#B62F91'},
        '11011025031': {'text': 'HPV+,HPV+,Hist: Normal,Hist: High-Grade', 'color': '#E665C9'},
        '12012015031': {'text': 'HPV-,HPV-,Cyt: Normal,Hist: High-Grade', 'color': '#9BDB19'},
        '13018': {'text': 'HPV?,Cyt: High-grade', 'color': '#666EF1'},
        '15015': {'text': 'Cyt: Normal,Cyt: Normal', 'color': '#C236F5'},
        '19033': {'text': 'Cyt: AGUS/ACIS,Hist: Irregular', 'color': '#BDD8AC'},
        '11019031': {'text': 'HPV+,Cyt: AGUS/ACIS,Hist: High-Grade', 'color': '#FD2C46'},
        '18018': {'text': 'Cyt: High-grade,Cyt: High-grade', 'color': '#6A8C88'},
        '12031031': {'text': 'HPV-,Hist: High-Grade,Hist: High-Grade', 'color': '#5DF2EC'},
        '11018025031': {'text': 'HPV+,Cyt: High-grade,Hist: Normal,Hist: High-Grade', 'color': '#FD179E'},
        '19025': {'text': 'Cyt: AGUS/ACIS,Hist: Normal', 'color': '#18267D'},
        '11018018': {'text': 'HPV+,Cyt: High-grade,Cyt: High-grade', 'color': '#31D2B2'},
        '13018025': {'text': 'HPV?,Cyt: High-grade,Hist: Normal', 'color': '#1CC965'},
        '13016025': {'text': 'HPV?,Cyt: Low-grade,Hist: Normal', 'color': '#6EAA9D'},
        '12012016': {'text': 'HPV-,HPV-,Cyt: Low-grade', 'color': '#78A906'},
        '15025025025': {'text': 'Cyt: Normal,Hist: Normal,Hist: Normal,Hist: Normal', 'color': '#8E5A9A'},
        '11011015025025': {'text': 'HPV+,HPV+,Cyt: Normal,Hist: Normal,Hist: Normal', 'color': '#EA6392'},
        '15': {'text': 'Cyt: Normal', 'color': '#d0adff'},
        '13018031': {'text': 'HPV?,Cyt: High-grade,Hist: High-Grade', 'color': '#AC02F6'},
        '31': {'text': 'Hist: High-Grade', 'color': '#986A82'},
        '18031031031031031': {
            'text': 'Cyt: High-grade,Hist: High-Grade,Hist: High-Grade,Hist: High-Grade,Hist: High-Grade,Hist: High-Grade',
            'color': '#D494BC'
        },
        '12012019025': {'text': 'HPV-,HPV-,Cyt: AGUS/ACIS,Hist: Normal', 'color': '#1517A8'},
        '31031': {'text': 'Hist: High-Grade,Hist: High-Grade', 'color': '#39916F'},
        '31031031036': {'text': 'Hist: High-Grade,Hist: High-Grade,Hist: High-Grade,Cancer', 'color': '#96A149'},
        '11012031031': {'text': 'HPV+,HPV-,Hist: High-Grade,Hist: High-Grade', 'color': '#B0A2EA'},
        '16031': {'text': 'Cyt: Low-grade,Hist: High-Grade', 'color': '#3FB192'},
        '23031': {'text': 'Cyt: Metastasis,Hist: High-Grade', 'color': '#D90285'},
        '15033': {'text': 'Cyt: Normal,Hist: Irregular', 'color': '#6638F3'},
        '13025': {'text': 'HPV?,Hist: Normal', 'color': '#67D509'},
        '16': {'text': 'Cyt: Low-grade', 'color': '#E4CC20'},
        '12012016031': {'text': 'HPV-,HPV-,Cyt: Low-grade,Hist: High-Grade', 'color': '#F21D95'},
        '25025025025': {'text': 'Hist: Normal,Hist: Normal,Hist: Normal,Hist: Normal', 'color': '#CC8035'},
        '12016025025': {'text': 'HPV-,Cyt: Low-grade,Hist: Normal,Hist: Normal', 'color': '#1B8F1B'},
        '11018031': {'text': 'HPV+,Cyt: High-grade,Hist: High-Grade', 'color': '#D92C82'},
        '18033036': {'text': 'Cyt: High-grade,Hist: Irregular,Cancer', 'color': '#5CDA92'},
        '36': {'text': 'Cancer', 'color': '#20AC5F'},
        '12016031': {'text': 'HPV-,Cyt: Low-grade,Hist: High-Grade', 'color': '#5AB189'},
        '11025025': {'text': 'HPV+,Hist: Normal,Hist: Normal', 'color': '#38EFF8'},
        '11012015025': {'text': 'HPV+,HPV-,Cyt: Normal,Hist: Normal', 'color': '#A75760'},
        '15025031': {'text': 'Cyt: Normal,Hist: Normal,Hist: High-Grade', 'color': '#35D460'},
        '11011025025': {'text': 'HPV+,HPV+,Hist: Normal,Hist: Normal', 'color': '#650EDA'},
        '12012015': {'text': 'HPV-,HPV-,Cyt: Normal', 'color': '#79FE35'},
        '16025025': {'text': 'Cyt: Low-grade,Hist: Normal,Hist: Normal', 'color': '#998D68'},
        '16031033': {'text': 'Cyt: Low-grade,Hist: High-Grade,Hist: Irregular', 'color': '#A148ED'},
        '25025': {'text': 'Hist: Normal,Hist: Normal', 'color': '#F00BAF'},
        '23036': {'text': 'Cyt: Metastasis,Cancer', 'color': '#8E083A'},
        '19031': {'text': 'Cyt: AGUS/ACIS,Hist: High-Grade', 'color': '#61CE8B'},
        '11': {'text': 'HPV+', 'color': '#c92633'},
        '13031': {'text': 'HPV?,Hist: High-Grade', 'color': '#E04A00'},
        '23': {'text': 'Cyt: Metastasis', 'color': '#9E031C'},
        '11012036': {'text': 'HPV+,HPV-,Cancer', 'color': '#AC33FA'},
        '12015015': {'text': 'HPV-,Cyt: Normal,Cyt: Normal', 'color': '#12C410'},
        '11012018031': {'text': 'HPV+,HPV-,Cyt: High-grade,Hist: High-Grade', 'color': '#2C4BC8'},
        '12012018036': {'text': 'HPV-,HPV-,Cyt: High-grade,Cancer', 'color': '#FDC7EB'},
        '11016016': {'text': 'HPV+,Cyt: Low-grade,Cyt: Low-grade', 'color': '#902E27'},
        '11011012': {'text': 'HPV+,HPV+,HPV-', 'color': '#8491A7'},
        '12012031031': {'text': 'HPV-,HPV-,Hist: High-Grade,Hist: High-Grade', 'color': '#F94224'},
        '12031': {'text': 'HPV-,Hist: High-Grade', 'color': '#AB2F2C'},
        '19031036': {'text': 'Cyt: AGUS/ACIS,Hist: High-Grade,Cancer', 'color': '#76D0A0'},
        '13015': {'text': 'HPV?,Cyt: Normal', 'color': '#C74BA7'},
        '11011016': {'text': 'HPV+,HPV+,Cyt: Low-grade', 'color': '#B658CD'},
        '25031031': {'text': 'Hist: Normal,Hist: High-Grade,Hist: High-Grade', 'color': '#EF0773'},
        '18033': {'text': 'Cyt: High-grade,Hist: Irregular', 'color': '#E7ED70'},
        '18025025': {'text': 'Cyt: High-grade,Hist: Normal,Hist: Normal', 'color': '#B1467C'},
        '16018': {'text': 'Cyt: Low-grade,Cyt: High-grade', 'color': '#621983'},
        '18': {'text': 'Cyt: High-grade', 'color': '#916f18'},
        '12018025025': {'text': 'HPV-,Cyt: High-grade,Hist: Normal,Hist: Normal', 'color': '#4FCD38'},
        '15025': {'text': 'Cyt: Normal,Hist: Normal', 'color': '#5BE359'},
        '12018031': {'text': 'HPV-,Cyt: High-grade,Hist: High-Grade', 'color': '#A134C9'},
        '11012018033': {'text': 'HPV+,HPV-,Cyt: High-grade,Hist: Irregular', 'color': '#839787'},
        '11033': {'text': 'HPV+,Hist: Irregular', 'color': '#91787E'},
        '12012018031': {'text': 'HPV-,HPV-,Cyt: High-grade,Hist: High-Grade', 'color': '#E645F3'},
        '19033036': {'text': 'Cyt: AGUS/ACIS,Hist: Irregular,Cancer', 'color': '#D62E7A'},
        '25033': {'text': 'Hist: Normal,Hist: Irregular', 'color': '#C97476'},
        '12033': {'text': 'HPV-,Hist: Irregular', 'color': '#9037D8'},
        '11011018025': {'text': 'HPV+,HPV+,Cyt: High-grade,Hist: Normal', 'color': '#2CADF2'},
        '31031031031036': {
            'text': 'Hist: High-Grade,Hist: High-Grade,Hist: High-Grade,Hist: High-Grade,Cancer',
            'color': '#B97B69'
        },
        '11019': {'text': 'HPV+,Cyt: AGUS/ACIS', 'color': '#E88754'},
        '25025025': {'text': 'Hist: Normal,Hist: Normal,Hist: Normal', 'color': '#2563F6'},
        '13': {'text': 'HPV?', 'color': '#97DEFF'},
        '11015016': {'text': 'HPV+,Cyt: Normal,Cyt: Low-grade', 'color': '#FBD538'},
        '11012016031031': {'text': 'HPV+,HPV-,Cyt: Low-grade,Hist: High-Grade,Hist: High-Grade', 'color': '#75D8F7'},
        '12012019031031': {'text': 'HPV-,HPV-,Cyt: AGUS/ACIS,Hist: High-Grade,Hist: High-Grade', 'color': '#4BFAF8'},
        '16025': {'text': 'Cyt: Low-grade,Hist: Normal', 'color': '#8213D6'},
        '11011025': {'text': 'HPV+,HPV+,Hist: Normal', 'color': '#A81AFC'},
        '-3': {'text': 'Other', 'color': '#020b19'},
        '11025': {'text': 'HPV+,Hist: Normal', 'color': '#5EBD9B'},
        '15025025': {'text': 'Cyt: Normal,Hist: Normal,Hist: Normal', 'color': '#394FF5'},
        '15025025031': {'text': 'Cyt: Normal,Hist: Normal,Hist: Normal,Hist: High-Grade', 'color': '#DB4D67'},
        '11012015025025': {'text': 'HPV+,HPV-,Cyt: Normal,Hist: Normal,Hist: Normal', 'color': '#78F6C3'},
        '11012031': {'text': 'HPV+,HPV-,Hist: High-Grade', 'color': '#8177A8'},
        '11015025025': {'text': 'HPV+,Cyt: Normal,Hist: Normal,Hist: Normal', 'color': '#571AB7'},
        '18031033': {'text': 'Cyt: High-grade,Hist: High-Grade,Hist: Irregular', 'color': '#1A442E'},
        '12018036': {'text': 'HPV-,Cyt: High-grade,Cancer', 'color': '#01D094'},
        '11011015': {'text': 'HPV+,HPV+,Cyt: Normal', 'color': '#66D748'},
        '12012016025': {'text': 'HPV-,HPV-,Cyt: Low-grade,Hist: Normal', 'color': '#2DACFF'},
        '12019025': {'text': 'HPV-,Cyt: AGUS/ACIS,Hist: Normal', 'color': '#5B082C'},
        '12018018': {'text': 'HPV-,Cyt: High-grade,Cyt: High-grade', 'color': '#63A296'},
        '19025031': {'text': 'Cyt: AGUS/ACIS,Hist: Normal,Hist: High-Grade', 'color': '#838CA5'},
        '12012018': {'text': 'HPV-,HPV-,Cyt: High-grade', 'color': '#0D8CCC'},
        '18036': {'text': 'Cyt: High-grade,Cancer', 'color': '#5D6D5D'},
        '11011018031': {'text': 'HPV+,HPV+,Cyt: High-grade,Hist: High-Grade', 'color': '#D58A15'},
        '23025': {'text': 'Cyt: Metastasis,Hist: Normal', 'color': '#4849A2'},
        '25': {'text': 'Hist: Normal', 'color': '#9163FB'},
        '11011015025': {'text': 'HPV+,HPV+,Cyt: Normal,Hist: Normal', 'color': '#D58F31'},
        '11015025': {'text': 'HPV+,Cyt: Normal,Hist: Normal', 'color': '#320125'},
        '11025031': {'text': 'HPV+,Hist: Normal,Hist: High-Grade', 'color': '#773855'},
        '12016036': {'text': 'HPV-,Cyt: Low-grade,Cancer', 'color': '#E2999C'},
        '15031036': {'text': 'Cyt: Normal,Hist: High-Grade,Cancer', 'color': '#0EE5B5'},
        '12015': {'text': 'HPV-,Cyt: Normal', 'color': '#EB1833'},
        '11011018': {'text': 'HPV+,HPV+,Cyt: High-grade', 'color': '#0198AD'},
        '33': {'text': 'Hist: Irregular', 'color': '#0631C5'},
        '12015025025': {'text': 'HPV-,Cyt: Normal,Hist: Normal,Hist: Normal', 'color': '#93C64F'},
        '18025': {'text': 'Cyt: High-grade,Hist: Normal', 'color': '#874EEB'},
        '15031031': {'text': 'Cyt: Normal,Hist: High-Grade,Hist: High-Grade', 'color': '#CA6331'},
        '11015025033': {'text': 'HPV+,Cyt: Normal,Hist: Normal,Hist: Irregular', 'color': '#D64D39'},
        '12018031036': {'text': 'HPV-,Cyt: High-grade,Hist: High-Grade,Cancer', 'color': '#D09297'},
        '18031036': {'text': 'Cyt: High-grade,Hist: High-Grade,Cancer', 'color': '#28946C'},
        '11013015': {'text': 'HPV+,HPV?,Cyt: Normal', 'color': '#5B5F5E'},
        '15016': {'text': 'Cyt: Normal,Cyt: Low-grade', 'color': '#755193'},
        '11012012': {'text': 'HPV+,HPV-,HPV-', 'color': '#AD71AD'},
        '11012016025': {'text': 'HPV+,HPV-,Cyt: Low-grade,Hist: Normal', 'color': '#3E9FE5'},
        '13018018025': {'text': 'HPV?,Cyt: High-grade,Cyt: High-grade,Hist: Normal', 'color': '#4604D3'},
        '12': {'text': 'HPV-', 'color': '#3CE264'},
        '-2': {'text': 'Origin', 'color': '#858a91'},
        '16033': {'text': 'Cyt: Low-grade,Hist: Irregular', 'color': '#FAC1B3'},
        '19036': {'text': 'Cyt: AGUS/ACIS,Cancer', 'color': '#269D3E'},
        '11016025': {'text': 'HPV+,Cyt: Low-grade,Hist: Normal', 'color': '#EADDB3'},
        '11012018025': {'text': 'HPV+,HPV-,Cyt: High-grade,Hist: Normal', 'color': '#A5CB36'},
        '15018': {'text': 'Cyt: Normal,Cyt: High-grade', 'color': '#3C2F0D'},
        '16016025': {'text': 'Cyt: Low-grade,Cyt: Low-grade,Hist: Normal', 'color': '#197249'},
        '12015031': {'text': 'HPV-,Cyt: Normal,Hist: High-Grade', 'color': '#4978F6'},
        '11011033': {'text': 'HPV+,HPV+,Hist: Irregular', 'color': '#BEC311'},
        '11012016': {'text': 'HPV+,HPV-,Cyt: Low-grade', 'color': '#372A80'},
        '33033': {'text': 'Hist: Irregular,Hist: Irregular', 'color': '#272A4E'},
        '11015031': {'text': 'HPV+,Cyt: Normal,Hist: High-Grade', 'color': '#E93AB6'},
        '12018025': {'text': 'HPV-,Cyt: High-grade,Hist: Normal', 'color': '#A944CB'},
        '12012018031031': {'text': 'HPV-,HPV-,Cyt: High-grade,Hist: High-Grade,Hist: High-Grade', 'color': '#40F386'},
        '15031': {'text': 'Cyt: Normal,Hist: High-Grade', 'color': '#32328D'},
        '11019025': {'text': 'HPV+,Cyt: AGUS/ACIS,Hist: Normal', 'color': '#7DC3C2'},
        '15036': {'text': 'Cyt: Normal,Cancer', 'color': '#A3A8A0'},
        '12012015025': {'text': 'HPV-,HPV-,Cyt: Normal,Hist: Normal', 'color': '#D7C196'},
        '19025031033': {'text': 'Cyt: AGUS/ACIS,Hist: Normal,Hist: High-Grade,Hist: Irregular', 'color': '#347C81'},
        '11011011011015': {'text': 'HPV+,HPV+,HPV+,HPV+,Cyt: Normal', 'color': '#7FEF60'},
        '11036': {'text': 'HPV+,Cancer', 'color': '#463EA7'},
        '31031031': {'text': 'Hist: High-Grade,Hist: High-Grade,Hist: High-Grade', 'color': '#946ACF'},
        '12015025': {'text': 'HPV-,Cyt: Normal,Hist: Normal', 'color': '#E7BE67'},
        '16031031': {'text': 'Cyt: Low-grade,Hist: High-Grade,Hist: High-Grade', 'color': '#A8736D'},
        '12036': {'text': 'HPV-,Cancer', 'color': '#9100AE'},
        '12025033': {'text': 'HPV-,Hist: Normal,Hist: Irregular', 'color': '#B2E34D'},
        '11016031': {'text': 'HPV+,Cyt: Low-grade,Hist: High-Grade', 'color': '#B933B4'},
        '11015033': {'text': 'HPV+,Cyt: Normal,Hist: Irregular', 'color': '#3A043F'},
        '15033033': {'text': 'Cyt: Normal,Hist: Irregular,Hist: Irregular', 'color': '#0915FC'},
        '12012025': {'text': 'HPV-,HPV-,Hist: Normal', 'color': '#8DC457'},
        '11011016025': {'text': 'HPV+,HPV+,Cyt: Low-grade,Hist: Normal', 'color': '#7B3926'},
        '19031031031': {'text': 'Cyt: AGUS/ACIS,Hist: High-Grade,Hist: High-Grade,Hist: High-Grade', 'color': '#C275FA'}
    }
    ;


var diagnosis1 = [['11', 'HPV+'], ['11011', 'HPV+,HPV+'], ['11012', 'HPV+,HPV-'], ['11015', 'HPV+,Cyt: Normal'], ['11016', 'HPV+,Cyt: Low-grade'], ['11018', 'HPV+,Cyt: High-grade'], ['11019', 'HPV+,Cyt: AGUS/ACIS'], ['11023', 'HPV+,Cyt: Metastasis'], ['11025', 'HPV+,Hist: Normal'], ['11031', 'HPV+,Hist: High-Grade'], ['11033', 'HPV+,Hist: Irregular'], ['11036', 'HPV+,Cancer'], ['12', 'HPV-'], ['12012', 'HPV-,HPV-'], ['12015', 'HPV-,Cyt: Normal'], ['12016', 'HPV-,Cyt: Low-grade'], ['12018', 'HPV-,Cyt: High-grade'], ['12019', 'HPV-,Cyt: AGUS/ACIS'], ['12025', 'HPV-,Hist: Normal'], ['12031', 'HPV-,Hist: High-Grade'], ['12033', 'HPV-,Hist: Irregular'], ['12036', 'HPV-,Cancer'], ['13', 'HPV?'], ['13015', 'HPV?,Cyt: Normal'], ['13016', 'HPV?,Cyt: Low-grade'], ['13018', 'HPV?,Cyt: High-grade'], ['13025', 'HPV?,Hist: Normal'], ['13031', 'HPV?,Hist: High-Grade'], ['15', 'Cyt: Normal'], ['15015', 'Cyt: Normal,Cyt: Normal'], ['15016', 'Cyt: Normal,Cyt: Low-grade'], ['15018', 'Cyt: Normal,Cyt: High-grade'], ['15025', 'Cyt: Normal,Hist: Normal'], ['15031', 'Cyt: Normal,Hist: High-Grade'], ['15033', 'Cyt: Normal,Hist: Irregular'], ['15036', 'Cyt: Normal,Cancer'], ['16', 'Cyt: Low-grade'], ['16016', 'Cyt: Low-grade,Cyt: Low-grade'], ['16018', 'Cyt: Low-grade,Cyt: High-grade'], ['16025', 'Cyt: Low-grade,Hist: Normal'], ['16031', 'Cyt: Low-grade,Hist: High-Grade'], ['16033', 'Cyt: Low-grade,Hist: Irregular'], ['16036', 'Cyt: Low-grade,Cancer'], ['18', 'Cyt: High-grade'], ['18018', 'Cyt: High-grade,Cyt: High-grade'], ['18025', 'Cyt: High-grade,Hist: Normal'], ['18031', 'Cyt: High-grade,Hist: High-Grade'], ['18033', 'Cyt: High-grade,Hist: Irregular'], ['18036', 'Cyt: High-grade,Cancer'], ['19', 'Cyt: AGUS/ACIS'], ['19025', 'Cyt: AGUS/ACIS,Hist: Normal'], ['19031', 'Cyt: AGUS/ACIS,Hist: High-Grade'], ['19033', 'Cyt: AGUS/ACIS,Hist: Irregular'], ['19036', 'Cyt: AGUS/ACIS,Cancer'], ['23', 'Cyt: Metastasis'], ['23025', 'Cyt: Metastasis,Hist: Normal'], ['23031', 'Cyt: Metastasis,Hist: High-Grade'], ['23036', 'Cyt: Metastasis,Cancer'], ['25', 'Hist: Normal'], ['25025', 'Hist: Normal,Hist: Normal'], ['25031', 'Hist: Normal,Hist: High-Grade'], ['25033', 'Hist: Normal,Hist: Irregular'], ['25036', 'Hist: Normal,Cancer'], ['31', 'Hist: High-Grade'], ['31031', 'Hist: High-Grade,Hist: High-Grade'], ['31033', 'Hist: High-Grade,Hist: Irregular'], ['31036', 'Hist: High-Grade,Cancer'], ['33', 'Hist: Irregular'], ['33033', 'Hist: Irregular,Hist: Irregular'], ['33036', 'Hist: Irregular,Cancer'], ['36', 'Cancer'], ['-1', 'Did not return'], ['-2', 'Origin'], ['-3', 'Other']]
    ;


var region = [
    ["1", "South-East"],
    ["2", "Middle"],
    ["3", "West"],
    ["4", "North"],
    ["9", "Unknown"]
];

var stage = [
    ["100", "Stage 1"],
    ["110", "Stage 1a"],
    ["111", "Stage 1a1"],
    ["112", "Stage 1a22"],
    ["120", "Stage 1b"],
    ["200", "Stage 2"],
    ["210", "Stage 2a"],
    ["220", "Stage 2b2"],
    ["300", "Stage 3"],
    ["310", "Stage 3a"],
    ["320", "Stage 3b"],
    ["400", "Stage 4"],
    ["410", "Stage 4a"],
    ["420", "Stage 4b"],
    ["900", "Unknown stage"],
    ["999", "Unspecified stage"]
];

var type = [
    ["cyt", "Cytological Smear"],
    ["hist", "Histological Sample"],
    ["hpv", "HPV Test"],
    ["cancer", "Cancer Diagnosis"]
];

var node_attributes = [
    {name: "age", display: "Age", type: "month"},
    {name: "birthdate", display: "Birthdate", type: "month"},
    {name: "censordate", display: "Censor Date", type: "month"},
    {name: "diagnosisdate", display: "Diagnosis Date", type: "month"},
    {name: "diagnosis1", display: "Diagnosis", type: "diagnosis1"},
    {name: "diagnosis2", display: "Morphology Code", type: "number"},
    {name: "lab_nr", display: "Laboratory Number", type: "number"},
    {name: "reg", display: "Region", type: "region"},
    {name: "stage", display: "Stage", type: "stage"},
    {name: "type", display: "Type of Exam", type: "type"}
];

var query_attributes = [
    {name: "diagnosis1", display: "Diagnosis", type: "diagnosis1"},
];

var edge_attributes = [
    {name: "sincelast", display: "Time Interval", type: "number"},
    {name: "type", display: "Exam Interval", type: "number"}
];

var constraints = {
    "month": {
        operators: [[">", "bigger"], ["<", "smaller"]],
        values: "month"
    },
    "diagnosis1": {
        operators: [["==", "is"], ["<>", "is not"]],
        values: diagnosis1
    },
    "region": {
        operators: [["==", "is"], ["<>", "is not"]],
        values: region
    },
    "stage": {
        operators: [["==", "is"], ["<>", "is not"]],
        values: stage
    },
    "type": {
        operators: [["==", "is"], ["<>", "is not"]],
        values: type
    },
    "number": {
        operators: [[">", "bigger"], ["<", "smaller"], ["==", "is"]],
        values: "number"
    }
};

module.exports = {

    VIEW_QUERY_GRAPH: {
        innerTextNodeClass: "InTextN",
        innerTextEdgeClass: "InTextE",
        outerTextNodeClass: "OuTextN",
        outerTextEdgeClass: "OuTextE",
        outerTextClass: "OutText",
        graphClass: "Graph",
        nodeClass: "Node",
        nodesClass: "Nodes",
        edgeClass: "Edge",
        edgesClass: "Edges",
        nodeRadius: 30,
        delete: 68
    },

    VIEW_QUERY_FORM: {

        "Node": node_attributes,

        "Edge": edge_attributes,

        types: constraints

    },

    VIEW_PREDICTION_FORM: {
        "Node": query_attributes
    },


    VIEW_PREDICTION_GRAPH: {
        display: display
    },

    "ID": "ID"


};