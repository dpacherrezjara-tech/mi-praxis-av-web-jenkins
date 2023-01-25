/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : GridDataByCurrency                                *
 * Created on : 11-10-2016, 14:40:24                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 11-10-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

/* global Ext */

Ext.define('PXMVCAMHome.model.sales.ConciliationASR.GridDataByCurrency', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'WKSTAT', type: 'string'},
        {name: 'FREPOR', type: 'string'},
        {name: 'MDA', type: 'string'},
        {name: 'HDTE', type: 'string'},
        {name: 'HNAME', type: 'string'},
        {name: 'HSTATUS', type: 'string'},
        {name: 'SCASH', type: 'float'},
        {name: 'SCREDIT', type: 'float'},
        {name: 'SEXCHA', type: 'float'},
        {name: 'STVOUCHER', type: 'float'},
        {name: 'RCASH', type: 'float'},
        {name: 'RCREDIT', type: 'float'},
        {name: 'REXCHA', type: 'float'},
        {name: 'RTVOUCHER', type: 'float'},
        {name: 'NCASH', type: 'float'},
        {name: 'NCREDIT', type: 'float'},
        {name: 'NEXCHA', type: 'float'},
        {name: 'NTVOUCHER', type: 'float'},
        {name: 'TCASH', type: 'float'},
        {name: 'TCREDIT', type: 'float'},
        {name: 'TEXCHA', type: 'float'},
        {name: 'TTVOUCHER', type: 'float'},
        {name: 'STOTAL', type: 'float'},
        {name: 'RTOTAL', type: 'float'},
        {name: 'NTOTAL', type: 'float'},
        {name: 'TTOTAL', type: 'float'},
        {name: 'A1530_A1720_CA_SUM', type: 'float'},
        {name: 'A1530_A1720_CC_SUM', type: 'float'},
        {name: 'A1530_A1720_EX_SUM', type: 'float'},
        {name: 'A1530_A1720_TV_SUM', type: 'float'},
        {name: 'STATUS', type: 'string'},
        {name: 'STATUS_RECORD', type: 'string',
            convert: function (value, record) {
                var strSTATUS_RECORD;
                var intA1530_A1720_CA_SUM = parseFloat(record.get('SCASH')) - parseFloat(record.get('RCASH'));
		var intA1530_A1720_CC_SUM = parseFloat(record.get('SCREDIT')) - parseFloat(record.get('RCREDIT'));
		
		switch(record.get('STATUS')){
                    case 'A':
                        strSTATUS_RECORD = 'MATCH'; //MATCH AUTOMATIC.
                        break;
                    case 'M':
                        strSTATUS_RECORD = 'MATCH'; //MATCH MANUAL.
                        break;
                    case 'D':
                        strSTATUS_RECORD = 'DIFF'; //DIFFERENCE.
                        break;
                    case '': //CALCULATE.
                        if(intA1530_A1720_CA_SUM === parseFloat(record.get('A1530_A1720_CA_SUM')) && intA1530_A1720_CC_SUM === parseFloat(record.get('A1530_A1720_CC_SUM'))){
                            strSTATUS_RECORD = 'MATCH';
                        }else{
                            strSTATUS_RECORD = 'DIFF';
                        }
                        break;
                    default:
                        strSTATUS_RECORD = record.get('STATUS');
		}
                return strSTATUS_RECORD;
            }
        },
        {
            name: 'userLastModify',
            type: 'string',
            convert: function (value, record) {
                return (record.get('USRM') === '') ? record.get('USRC') : record.get('USRM');
            }
        },
        {
            name: 'dateLastModify',
            type: 'string',
            convert: function (value, record) {
                var datadateLastModify = (record.get('DATM') === '') ? record.get('DATC') : record.get('DATM');
                return (String(datadateLastModify) !== '') ? (String(datadateLastModify).substr(2, 2) + '/' + String(datadateLastModify).substr(4, 2) + '/' + String(datadateLastModify).substr(6, 2)) : '';
            }
        }
    ]
});
