Ext.define('Ext.Praxis.view.payments.EmailControlForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    bodyStyle: 'background-color: #E3EAEF;border: none;',

    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            margin: '20px 0 0 0',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1420,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    border: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   GRID MAIN DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            border: false,
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            height: 655,
                            width: 1347,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [

                                // =======================
                                // PANEL DE LA GRILLA MAIN
                                // =======================
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelGridEmail',
                                    //id: prototype.id + '-panelGridData',
                                    border: false,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    items: [

                                        {
                                            xtype: 'label',
                                            text: 'EMAIL CONTROL',
                                            margin: '0 0 15 0',
                                            style: 'font-size:22px;font-weight:bold;color:#2F5597;text-align:center;'
                                        },

                                        {xtype: 'tbspacer', height: 15},

                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridEmailControl',
                                            width: 872,
                                            height: 490,
                                            hidden: false,
                                            columnLines: true,
                                            viewConfig: {
                                                enableTextSelection: true
                                            },
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [

                                                    {text: 'ID', dataIndex: 'ID', width: 80},

                                                    {text: 'PROCESS', dataIndex: 'PROCESS', width: 300},

                                                    {text: 'TOTAL EMAIL', dataIndex: 'TOTAL_EMAILS', width: 130},

                                                    {text: 'TO', dataIndex: 'TOTAL_TO', width: 100},

                                                    {text: 'CC', dataIndex: 'TOTAL_CC', width: 100},
                                                    
                                                    {text: 'BCC', dataIndex: 'TOTAL_BCC', width: 100},

                                                    {
                                                        xtype: 'actioncolumn',
                                                        text: 'Detail',
                                                        width: 60,
                                                        align: 'center',
                                                        items: [{
                                                                icon: CONTEXTPATH + '/resources/img/icon/email_control.png',
                                                                tooltip: 'View emails',
                                                                handler: 'onGridDetail'
                                                            }]
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },

                                // ===========================
                                // PANEL DE LA GRILLA DETAIL
                                // ===========================


                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelGridEmailDetail',
                                    border: false,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    hidden: true,
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    items: [

                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-lblProcess',
                                            hidden: true,
                                            margin: '0 0 15 0',
                                            style: 'font-size:16px;font-weight:bold;color:#2F5597;',
                                            text: ''
                                        },

                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridEmailControlDetail',
                                            width: 1052,
                                            height: 490,
                                            columnLines: true,
                                            viewConfig: {
                                                enableTextSelection: true
                                            },
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [

                                                    {text: 'TRAN', dataIndex: 'TRAN', width: 80},

                                                    {text: 'PROCESS', dataIndex: 'PROCESS', width: 200},

                                                    {text: 'EMAIL', dataIndex: 'EMAIL', width: 300, align: 'center'},

                                                    {text: 'ROLE', dataIndex: 'ROL', width: 130},

                                                    {text: 'TYPE', dataIndex: 'PTYPE', width: 110, align: 'center',
                                                    renderer: function (value) {
                                                            return value === 'TO' ? 'Destinatario' :
                                                                   value === 'CC' ? 'Copia' :
                                                                   value === 'BCC' ? 'Oculto' :
                                                                   value;}
                                                    
                                                    },


                                                    {
                                                        text: 'STATUS',
                                                        dataIndex: 'STATUS',
                                                        width: 110,
                                                        align: 'center',
                                                        renderer: function (value) {

                                                            if (value === 'A') {
                                                                return '<span class="badge badge-active">Active</span>';
                                                            }

                                                            if (value === 'I') {
                                                                return '<span class="badge badge-inactive">Inactive</span>';
                                                            }

                                                            return value;
                                                        }
                                                    },

                                                    {
                                                        xtype: 'actioncolumn',
                                                        text: 'Edit',
                                                        width: 60,
                                                        items: [{
                                                                icon: CONTEXTPATH + '/resources/img/icon/edit.png',
                                                                tooltip: 'Edit Email',
                                                                handler: 'onEditClick'
                                                            }]
                                                    },

                                                    {
                                                        xtype: 'actioncolumn',
                                                        text: 'Delete',
                                                        width: 60,
                                                        items: [{
                                                                icon: CONTEXTPATH + '/resources/img/icon/delete.png',
                                                                tooltip: 'Delete Email',
                                                                handler: 'onDeleteClick'
                                                            }]
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },

                                {xtype: 'tbspacer', height: 20},

                                // =======================
                                // PANEL DEL PIE
                                // =======================
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-pie',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: false,
                                    width: 800,
                                    height: 25,
                                    bodyStyle: 'background-color: #E1E6EC; border-radius: 5px;',

                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: 650,
                                            height: 25,
                                            bodyStyle: 'background-color: #6A8BAA; border: 1px solid #81BEF7; border-radius: 5px',
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            defaults: {
                                                xtype: 'label'
                                            },
                                            items: [
                                                {
                                                    text: 'Page',
                                                    width: 50,
                                                    style: 'margin-top: 3px;color:white;font-weight:bold'
                                                },
                                                {
                                                    id: prototype.id + '-lbl-currentPage',
                                                    text: '1',
                                                    width: 50,
                                                    style: 'margin-top: 3px;color:white;font-weight:bold'
                                                },
                                                {
                                                    text: 'OF',
                                                    width: 50,
                                                    style: 'margin-top: 3px;color:white;font-weight:bold'
                                                },
                                                {
                                                    id: prototype.id + '-lbl-pageCount',
                                                    text: '0',
                                                    width: 50,
                                                    style: 'margin-top: 3px;color:white;font-weight:bold'
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    text: 'Total Found',
                                                    width: 80,
                                                    style: 'margin-top: 3px;color:white;font-weight:bold'
                                                },
                                                {
                                                    id: prototype.id + '-lbl-total',
                                                    text: '0',
                                                    width: 40,
                                                    style: 'margin-top: 3px;color:white;font-weight:bold'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]


                        }
                    ]







                }
            ]
        }
    ]
}
);


Ext.util.CSS.createStyleSheet(`

.badge{
    padding:2px 10px;
    border-radius:10px;
    color:white;
    font-weight:bold;
    font-size:11px;
    display:inline-block;
    min-width:70px;
    text-align:center;
}

.badge-active{
    background:#28a745;
}

.badge-inactive{
    background:#6c757d;
}

`, 'status-badge');