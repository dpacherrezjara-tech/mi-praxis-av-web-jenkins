/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.refund.RefundInputsForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            margin: '12px 0 12px 12px',
            layout: 'column',
            defaults: {
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                labelAlign: 'left'
            },
            items: [
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromYear',
                    fieldLabel: 'Year',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    queryMode: 'local',
                    triggerAction: 'all',
                    enableKeyEvents: true,
                    labelWidth: 35,
                    width: 115,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    enforceMaxLength: true,
                    style: 'margin-right:10px;',
                },
                {
                    fieldLabel: 'Ticket',
                    xtype: 'textfield',
                    id: prototype.id + '-txtTICKET',
                    width: 165,
                    labelWidth: 45,
                    maxLength: 13,
                    maskRe: /^[0-9]$/,
                    disabled: true,
                    enforceMaxLength: true, 
                    style: 'margin-right:10px;',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                },
                {
                        xtype: 'form',
                        id: prototype.id + '-form-Iatas',
                        border: false,
                        margin: "0 0 0 0",
                        bodyStyle: 'background-color: #E3EAF9;',
                        items: [{
                            xtype: 'fileuploadfield',
                            id: prototype.id + '-fileIatas',
                            name: 'excelfile',
                            fieldLabel: '<span style="text-align: left; font-size: 14px">Upload File</span>',
                            allowBlank: true,
                            accept: '.txt',
                            labelWidth: 75,
                            width: 320,
                            buttonText: 'Select file...',
                            regex: /(.)+((\.xlsx)|(\.csv)(\w)?)$/i,
                            regexText: 'Only XLS and XLSX formats are accepted',
                            buttonConfig: {
                                text: '<span style="font-size:14px">Select file</span>',
                                width: 85
                            }
                        }]
                },
                {
                    xtype: 'button',
                    id: prototype.id + '-btn_Concilia_LIQvsEC',
                    width: 90,
                    html: '<span style="color:white;font-size:14px;color:white;font-weight:600">Load File</span>',
                    style: 'background:#6A95AF;margin-top:1px',
                    border: false,
                    listeners: {
                        click: 'onLoadClick_TktIatas'
                    }
                }
            ]
        }
    ]
});

