Ext.define('Ext.Praxis.view.panel.ReportAccessLogForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '2 0 2 0 ',
    height: 40,
    layout:'column',
    items: [
        {
            xtype:'panel',
            border:false,
            bodyStyle: 'background: transparent',
            padding: '5px 8px',
            layout: 'column',
            items: [
                {
                    width: 220,
                    border:false,
                    bodyStyle: 'background: transparent',
                    items:[
                        {
                            xtype:'combo',
                            fieldLabel: '<span style="color:#000;">Search By</span>',
                            id: prototype.id + '-cboGroup',
                            labelAlign:'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            //emptyText: pxutils.emptyText,
                            labelWidth: 70,
                            width:'100%',
                            anchor:'100%',
                            listeners: {
                                afterrender: function(obj) {
                                    obj.setValue('1'); //All
                                }
                            }
                        }
                    ]
                },
                {
                    width: 220,
                    border:false,
                    bodyStyle: 'background: transparent',
                    items:[
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-codigo-option',
                            maxLength: 10,
                            enforceMaxLength: true,
                            labelWidth:90,
                            labelAlign:'right',
                            width:'100%',
                            anchor:'100%',
                            listeners:{
                                change: 'onUpperValue'
                            }
                        }
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="boxDateFilter">
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxDateFilter',
//                            width: prototype.widthContenedor,
                    layout: 'hbox',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        padding: '5px 1px 5px 1px',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        xtype: 'textfield',
                        hidden: false,
                        selectOnFocus: true,
                        enableKeyEvents: true,
                        enforceMaxLength: true
                    },
                    items: [
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            html: 'Date from',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {
                            xtype: 'datefield',
                            id:prototype.id+'-txtDateFrom',
                            fieldStyle: 'text-align:center',
                            format: 'Y/m/d',
                            formatText: '',
                            invalidText: 'Format valid YYYY/MM/DD',
                            minValue: new Date(1990, 00, 01),
                            maskRe: /[0-9/]/,
                            editable: true,
                            enforceMaxLength: true,
                            maxLength: 10,
                            inputAttrTpl: "data-qtip='Format valid YYYY/MM/DD'",
                            width: 90
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            html: 'to',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {
                            xtype: 'datefield',
                            id:prototype.id+'-txtDateTo',
                            fieldStyle: 'text-align:center',
                            format: 'Y/m/d',
                            formatText: '',
                            invalidText: 'Format valid YYYY/MM/DD',
                            minValue: new Date(1990, 00, 01),
                            maskRe: /[0-9/]/,
                            editable: true,
                            enforceMaxLength: true,
                            maxLength: 10,
                            inputAttrTpl: "data-qtip='Format valid YYYY/MM/DD'",
                            width: 90
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ]
});