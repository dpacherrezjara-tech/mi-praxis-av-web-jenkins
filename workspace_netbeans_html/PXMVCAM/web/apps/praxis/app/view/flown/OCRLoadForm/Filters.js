Ext.define('Ext.Praxis.view.flown.OCRLoadForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'vbox',
            defaults: {
                labelStyle: 'font-weight:bold;',
//                fieldStyle: 'text-align: center;',
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
                {
                    xtype: 'panel',
                    border: false,
                    layout: 'hbox',
                    bodyStyle: 'background: transparent',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
        //                fieldStyle: 'text-align: center;',
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
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        // <editor-fold defaultstate="collapsed" desc="Combo Date">
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Flight Date</strong>',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        { xtype: 'tbspacer', width: 8 },
                        {
                            xtype: 'label',
                            html: 'From:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        { xtype: 'tbspacer', width: 4 },
                        {
                            xtype:'combo',
                            id: prototype.id + '-cmbDateFromYear',
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            forceSelection: true,
                            caseSensitive: true,
                            editable: false,
                            valueField: 'code',
                            displayField: 'name',
                            width: 80,
                            hiddenLabel: false,
                            listConfig: {maxHeight: 111}
                        },
                        { xtype: 'tbspacer', width: 4 },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromMonth',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable:false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
        //                    emptyText: 'All',
                            labelWidth: 0,
                            width: 80,
                            anchor: '100%',
                            listConfig: {maxHeight: 111}
                        },
                        { xtype: 'tbspacer', width: 4 },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromDay',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable:false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
        //                    emptyText: 'All',
                            labelWidth: 0,
                            width: 80,
                            anchor: '100%',
                            listConfig: {maxHeight: 111}
                        },
                        { xtype: 'tbspacer', width: 15 },
                        {
                            xtype: 'label',
                            html: 'To:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        { xtype: 'tbspacer', width: 4 },
                        {
                            xtype:'combo',
                            id: prototype.id + '-cmbDateToYear',
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            forceSelection: true,
                            caseSensitive: true,
                            editable: false,
                            valueField: 'code',
                            displayField: 'name',
                            width: 80,
                            hiddenLabel: false,
                            listConfig: {maxHeight: 111},
                            listeners:{
                                change: 'onCmbToYearChange'
                            }
                        },
                        { xtype: 'tbspacer', width: 4 },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToMonth',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable:false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
        //                    emptyText: 'All',
                            labelWidth: 0,
                            width: 80,
                            anchor: '100%',
                            listConfig: {maxHeight: 111}
                        },
                        { xtype: 'tbspacer', width: 4 },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToDay',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable:false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
        //                    emptyText: 'All',
                            labelWidth: 0,
                            width: 80,
                            anchor: '100%',
                            listConfig: {maxHeight: 111}
                        },
                        // </editor-fold>
                        { xtype: 'tbspacer', width: 40 },
                        {
                            xtype: 'label',
                            html: 'Flight Number:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFlight',     
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,     
                            maskRe: /[0-9]/,      
                            maxLength: 5,
                            width: 50,    
                            enableKeyEvents: true,
                            listeners:{
                                keypress: 'onFlightKeypress'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: false,
                    layout: 'hbox',
                    bodyStyle: 'background: transparent',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
        //                fieldStyle: 'text-align: center;',
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
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            html: 'Departure City:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        { xtype: 'tbspacer', width: 4 },
                        {
                            xtype:'combo',
                            id: prototype.id + '-cmbCDEPART',
                            queryMode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            hiddenLabel: false,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 200,
                            typeAhead: true,
                            emptyText: 'All',
                            valueField: 'code',
                            displayField: 'name',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            listeners:{
                                focus: function(combo) {
                                    combo.expand();
                                }
                            }
                        },
                        { xtype: 'tbspacer', width: 15 },
                        {
                            xtype: 'label',
                            html: 'Arrival City:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        { xtype: 'tbspacer', width: 4 },
                        {
                            xtype:'combo',
                            id: prototype.id + '-cmbCARRIVA',
                            queryMode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            hiddenLabel: false,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 200,
                            typeAhead: true,
                            emptyText: 'All',
                            valueField: 'code',
                            displayField: 'name',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            listeners:{
                                focus: function(combo) {
                                    combo.expand();
                                }
                            }
                        },
                        { xtype: 'tbspacer', width: 15 },
                        {
                            xtype: 'label',
                            html: 'Ticket:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTKT',     
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,     
                            maskRe: /[0-9]/,      
//                            maxLength: 13,
                            width: 156,    
                            enableKeyEvents: true,
                            listeners:{
                                change: 'onValidarChange',
                                keypress: 'onTextKeypress'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});

