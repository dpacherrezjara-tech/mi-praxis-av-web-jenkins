/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : GridTransaction                                   *
 * Created on : 21-09-2016, 11:46:17                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 21-09-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

/* global Ext */

Ext.define('PXMVCAMHome.model.sales.ConciliationASR.GridTransaction', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'FREPOR', type: 'string'},
        {name: 'SEQ', type: 'string'},
        {name: 'STATION', type: 'string'},
        {name: 'CODE', type: 'string'},
        {name: 'OPDT', type: 'string'},
        {name: 'OPTM', type: 'string'},
        {name: 'ST', type: 'string'},
        {name: 'CLDT', type: 'string'},
        {name: 'CLTM', type: 'string'},
        {name: 'XTDT', type: 'string'},
        {name: 'XTTM', type: 'string'},
        {
            name: 'SAMT',
            type: 'string',
            convert: function (value, record) {
                var dataSAMT = value;
                return (String(dataSAMT) !== '') ? String(dataSAMT) : 'N';
            }
        },
        {
            name: 'FTRANSP',
            type: 'string',
            convert: function (value, record) {
                var dataFTRANSP = value;
                return (String(dataFTRANSP) !== '') ? (String(dataFTRANSP).substr(2, 2) + '/' + String(dataFTRANSP).substr(4, 2) + '/' + String(dataFTRANSP).substr(6, 2)) : '';
            }
        },
        {name: 'XTST', type: 'string'},
        {name: 'VOIDS', type: 'string'},
        {name: 'MANUP', type: 'string'},
        {name: 'TTRANSP', type: 'string'},
        {
            name: 'diffTransactions',
            type: 'string',
            convert: function (value, record) {
                return parseInt(record.get('XTST')) - parseInt(record.get('TTRANSP'));
            }
        },
        {
            name: 'processState',
            type: 'string',
            convert: function (value, record) {
                return (parseInt(record.get('diffTransactions')) !== 0) ? 'DIFF' : 'MATCH';
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
