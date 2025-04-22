Ext.define('Ext.Praxis.view.panel.PerProForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxConsultas',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1200,
//                height: 570,
                align: 'center'
            },
            items: [
                // <editor-fold defaultstate="collapsed" desc="boxMainData">
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: 1200,
//                        height: 545,
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'tabpanel',
                            id: prototype.id + '-tabpanel',
                            padding: '50 0 0 0',
                            width: 1100,
                            height: 510,
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridData">
                                {
                                    title: 'Info',
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData',
                                    width: 1100,
                                    height: 510,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            { text:'User', dataIndex: 'USR', type: 'string', width: 100, align: 'C' },
                                            { text:'Program', dataIndex: 'NPROG', type: 'string', width: 100, align: 'C' },
                                            { text:'Description', dataIndex: 'PROG', type: 'string', width: 200, align: 'L' },
                                            { text: 'Authorization',
                                                columns: [
                                                    { text:'Access', dataIndex: 'PERMA', type: 'string', width: 60, align: 'C' },
                                                    { text:'Read', dataIndex: 'PERML', type: 'string', width: 60, align: 'C' },
                                                    { text:'Insert', dataIndex: 'PERMC', type: 'string', width: 60, align: 'C' },
                                                    { text:'Update', dataIndex: 'PERMM', type: 'string', width: 60, align: 'C' },
                                                    { text:'Delete', dataIndex: 'PERME', type: 'string', width: 60, align: 'C' },
                                                    { text:'Export', dataIndex: 'PERMX', type: 'string', width: 60, align: 'C' }
                                                ]
                                            },
                                            { text:'Status', dataIndex: 'STAT', type: 'string', width: 60, align: 'C'},
                                            { text:'USCR', dataIndex: 'USCR', type: 'string', width: 100, align: 'L' },
                                            { text:'DTCR', dataIndex: 'DTCR', type: 'string', width: 110, align: 'L'},
                                            { text:'USUP', dataIndex: 'USUP', type: 'string', width: 100, align: 'L'},
                                            { text:'DTUP', dataIndex: 'DTUP', type: 'string', width: 110, align: 'L'},
                                            {
                                                text: 'Edit',
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 60,
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
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="copyUser">
                                {
                                    title: "Copy User",
                                    xtype: 'form',
                                    id: prototype.id + '-copyEntry',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    defaults:{
                                        style: 'margin: 3px;',
                                        border: false
                                    },
                                    items:[
                                        { xtype: 'tbspacer', height: 20 },
                                        {
                                            xtype:"container",
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            items:[
                                                {
                                                    xtype: 'label',
                                                    text: 'Start User',
                                                    style: 'font-weight:bold;color:#000;',
                                                    width: 70
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-startUSR',
                                                    text: '',
                                                    maxLength: 10,
                                                    enforceMaxLength: true,
                                                    //style: 'font-weight:bold;color:red;',
                                                    width: 120,
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Mandatory Field'
                                                    },
                                                    listeners:{
                                                        change: 'onUpperValue'
                                                    }
                                                },
                                                { xtype: 'tbspacer', width: 7 },
                                                {
                                                    text: 'test',
                                                    border: 0,
                                                    id: prototype.id + '-icon-next',
                                                    iconCls: 'prx-icon-pagination-next',
                                                    width: 30

                                                },
                                                { xtype: 'tbspacer', width: 7 },
                                                {
                                                    xtype: 'label',
                                                    text: 'End User',
                                                    style: 'font-weight:bold;color:#000;',
                                                    width: 60
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-endUSR',
                                                    text: '',
                                                    maxLength: 10,
                                                    enforceMaxLength: true,
                                                    //style: 'font-weight:bold;color:red;',
                                                    width: 120,
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Mandatory Field'
                                                    },
                                                    listeners:{
                                                        change: 'onUpperValue'
                                                    }
                                                }
                                            ]
                                        },
                                        { xtype: 'tbspacer', height: 7 },
                                        {
                                            text: 'Save',
                                            xtype:'button',
                                            id:prototype.id+'-btn-copy-save',
                                            iconCls: 'prx-icon-save',
                                            border: 1,
                                            padding: '5',
                                            listeners:{
                                                click: 'onCopyUSR'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="assignModule">
                                {
                                    title: "Assign by Module",
                                    xtype: 'form',
                                    id: prototype.id + '-assignModuleEntry',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    defaults:{
                                        style: 'margin: 3px;',
                                        border: false
                                    },
                                    items:  [
                                        { xtype: 'tbspacer', height: 20 },
                                        {
                                            xtype:"container",
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            items:[
                                                {
                                                    xtype: 'label',
                                                    text: 'User',
                                                    style: 'font-weight:bold;color:#000;',
                                                    width: 50
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-moduleUSR',
                                                    text: '',
                                                    maxLength: 10,
                                                    enforceMaxLength: true,
                                                    //style: 'font-weight:bold;color:red;',
                                                    width: 120,
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Mandatory Field'
                                                    },
                                                    listeners:{
                                                        change: 'onUpperValue'
                                                    }
                                                },
                                                { xtype: 'tbspacer', width: 7 },
                                                {
                                                    xtype:'combo',
                                                    fieldLabel: '<span style="color:#000;">Module</span>',
                                                    id: prototype.id + '-cboModuleGroup',
                                                    labelAlign:'left',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    autoSelect: false,
                                                    enableKeyEvents: true,
                                                    caseSensitive: true,
                                                    valueField: 'code',
                                                    displayField: 'name',
                                                    //emptyText: pxutils.emptyText,
                                                    labelWidth: 50,
                                                    width:'120',
                                                    anchor:'100%',
                                                    listeners: {
                                                        afterrender: function(obj) {
                                                            obj.setValue(''); //All
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        { xtype: 'tbspacer', height: 7 },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items:[
                                                { xtype: 'tbspacer', width: 7 },
                                                {
                                                    xtype: 'label',
                                                    text: 'Permissions',
                                                    style: 'font-weight:bold;color:#000;',
                                                    width: 100
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items:[
                                                { xtype: 'tbspacer', width: 7 },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id + '-moduleChkAccess',
                                                    boxLabelAlign: 'after',
                                                    width: 70,
                                                    boxLabel: '<b>Access</b>',
                                                    value: true,
                                                    readOnly: false
                                                },
                                                { xtype: 'tbspacer', width: 7 },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id + '-moduleChkInsert',
                                                    boxLabelAlign: 'after',
                                                    width: 70,
                                                    boxLabel: '<b>Insert</b>',
                                                    value: true,
                                                    readOnly: false
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items:[
                                                { xtype: 'tbspacer', width: 7 },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id + '-moduleChkRead',
                                                    boxLabelAlign: 'after',
                                                    width: 70,
                                                    boxLabel: '<b>Read</b>',
                                                    value: true,
                                                    readOnly: false
                                                },
                                                { xtype: 'tbspacer', width: 7 },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id + '-moduleChkUpdate',
                                                    boxLabelAlign: 'after',
                                                    width: 70,
                                                    boxLabel: '<b>Update</b>',
                                                    value: true,
                                                    readOnly: false
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items:[
                                                { xtype: 'tbspacer', width: 7 },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id + '-moduleChkExport',
                                                    boxLabelAlign: 'after',
                                                    width: 70,
                                                    boxLabel: '<b>Export</b>',
                                                    value: true,
                                                    readOnly: false
                                                },
                                                { xtype: 'tbspacer', width: 7 },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id + '-moduleChkDelete',
                                                    boxLabelAlign: 'after',
                                                    width: 70,
                                                    boxLabel: '<b>Delete</b>',
                                                    value: true,
                                                    readOnly: false
                                                }
                                            ]
                                        },
                                        { xtype: 'tbspacer', height: 7 },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items:[
                                                {
                                                    text: 'Save',
                                                    xtype:'button',
                                                    id:prototype.id+'-btn-module-save',
                                                    iconCls: 'prx-icon-save',
                                                    border: 1,
                                                    padding: '5',
                                                    listeners:{
                                                        click: 'onInsertModule'
                                                    }
                                                },
                                                { xtype: 'tbspacer', width: 7 },
                                                {
                                                    text: 'Delete',
                                                    xtype:'button',
                                                    id:prototype.id+'-btn-module-delete',
                                                    iconCls: 'prx-icon-delete',
                                                    border: 1,
                                                    padding: '5',
                                                    listeners:{
                                                        click: 'onDeleteModule'
                                                    }
                                                }
                                            ]
                                        }
                                        
                                    ]
                                }
                                // </editor-fold>
                            ]
                        },
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            hidden: true,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 0px 1px 0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: prototype.widthGrid,
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
                        // </editor-fold>
                    ]
                }
                // </editor-fold>
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
});