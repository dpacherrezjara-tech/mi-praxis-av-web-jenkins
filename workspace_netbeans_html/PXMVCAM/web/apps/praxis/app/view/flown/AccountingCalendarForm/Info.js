/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.AccountingCalendarForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'left'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: true,              
                height: 510,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-subOptions',
                    layout: {
                        type: 'hbox',
                        align: 'left'

                    },
                    border: false,
                    height: 35,
                    defaults: {
                        border: false,                        
                        align: 'center'
                    },
                    padding: '5px 5px 5px 5px',
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-currentPeriod',
                            fieldLabel: '<strong style="color:#000;">Current Period</strong>',
                            labelAlign: 'right',
                            readOnly: true,
                            labelWidth: 100,
                            width: 180,                            
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        }
                        , {xtype: 'tbspacer', width: 650},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbStatus',
                            fieldLabel: '<strong style="color:#000;">Status</strong>',
                            labelAlign: 'right',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            value:'Open',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 60,
                            width: 150,
                            anchor: '100%'
                        }, , {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnSaveStatus',
                            text: '<strong style="color:#000;">Save</strong>',
                            height: 25,
                            width: 60,
                            border: true
                            //cls: 'btn-save'
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridData',
                    height: 510,
                      width: 512,
                    hidden: false,
                    columnLines: true,
                    padding: '5x 5px 0px 5px',
                    margin: '0 100px 0 350px',
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'

                        },
                        items: [
                            {text: 'Accounting', border: 'border: 1px solid black',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true,
                                    width: 200
                                },
                                columns: [
                                    {text: 'Period', width: 100, dataIndex: 'strFormatDate'},
                                    {text: 'Status', width: 100, dataIndex: 'STATUS'}
                                ]
                            },
                            {text: 'Last Update',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true,
                                    width: 300
                                },
                                columns: [
                                    {text: 'User', width: 100, dataIndex: 'USUP'},
                                    {text: 'Date',  width: 100, dataIndex: 'FEUP'},
                                    {text: 'Time',  width: 100, dataIndex: 'HOUP'}
                                ]
                            }


                        ]
                    }
                }

            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
}
);

