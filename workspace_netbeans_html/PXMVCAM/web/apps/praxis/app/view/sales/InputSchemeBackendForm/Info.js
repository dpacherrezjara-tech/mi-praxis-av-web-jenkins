/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.InputSchemeBackendForm.Info', {
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
            id: prototype.id + '-regionCenterGrid01',
            width: 1250,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                // --------------------------   GRID MAIN DATA---------------------
                //-----------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridData',
                    height: 550,
                    width: 1040,
                    columnLines: true,
                    resizable: false,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            resizable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'CONTRACT', width: 100, dataIndex: 'TITLE'},
                            {text: 'NUMBER', width: 70, dataIndex: 'A1155CODAC'},
                            {text: 'VERSION', width: 70, dataIndex: 'A1155VRSAC'},
                            {text: 'EFFEC. DATE', width: 120, dataIndex: 'A1155FINI'},
                            {text: 'TERM. DATE', width: 120, dataIndex: 'A1155FFIN'},
                            {text: 'DATE TYPE', width: 80, dataIndex: 'A1155FLGFE',
                                renderer: function(value, metaData, record) {
                                    var value = record.data['A1155FLGFE'].trim();
                                    var dat = "";
                                    if (value === "E")
                                        dat = "[E]DATE OF SALE";
                                    if (value === "I")
                                        dat = "[I]DATE OF INITIAL TRAVEL";
                                    if (value === "F")
                                        dat = "[F]DATE OF INVOICING";
                                    if (value === "U")
                                        dat = "[U]DATE OF USE";

                                    return dat;
                                }
                            },
                            {text: 'AUTOMATED', width: 100, dataIndex: 'A1155FLGAU',
                                renderer: function(value, metaData, record) {
                                    var value = record.data['A1155FLGAU'].trim();
                                    var dat = "";
                                    if (value === "S")
                                        dat = "YES";
                                    if (value === "N")
                                        dat = "NO";
                                    if (value === "Y")
                                        dat = "YES";
                                    return dat;
                                }
                            },
                            {text: 'STATUS', width: 100, dataIndex: 'A1155FESTA',
                                renderer: function(value, metaData, record) {
                                    var value = record.data['A1155FESTA'].trim();
                                    var dat = "";
                                    if (value === "R")
                                        dat = "[R] REGISTERED.";
                                    if (value === "D")
                                        dat = "[D] DEVELOPMENT.";
                                    if (value === "P")
                                        dat = "[P] PRODUCTION.";
                                    if (value === "U")
                                        dat = "[U] UPGRADE.";
                                    if (value === "C")
                                        dat = "[C] CERTIFICATE.";
                                    if (value === "A")
                                        dat = "[A] CANCELLED.";
                                    return dat;
                                }
                            },
                            {text: 'ADDENDUM', width: 90, dataIndex: 'A1530MDA'},
                            {text: 'RECEPTION DATE', width: 120, dataIndex: 'A1155FRECE'},
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                text: 'Edit',
                                width: 70,
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'prx-icon-edit',
                                        tooltip: 'Edit',
                                        handler: 'onEditClick'
                                    }
                                ]
                            }
                        ]
                    }
                },
                /** PAGINATION LABELS*/
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: true,
                        padding: '0px 1px 0px 1px'
                    },
                    padding: '1px 1px 1px 1px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 1040,
                            height: 25,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            defaults: {
                                xtype: 'label',
                                margin: '3px 0px 0px 5px'
                            },
                            items: [
                                {
                                    text: 'Page',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.id + '-lbl-total',
                                    text: '0',
                                    width: 50
                                }
                            ]
                        }
                    ]
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

