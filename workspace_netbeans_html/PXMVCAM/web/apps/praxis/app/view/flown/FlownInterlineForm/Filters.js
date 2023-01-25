Ext.define('Ext.Praxis.view.flown.FlownInterlineForm.Filters', {
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
            layout: 'column',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
//                hidden: true,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                {xtype: 'tbspacer', width: 10},
                //<editor-fold defaultstate="collapsed" desc="cmbDate">
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromYear',
                    fieldStyle: 'text-align: left;',
                    disabled: false,
                    editable: false,
                    fieldLabel: 'Date',
                    width: 120,
                    labelWidth: 45,
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code',
                    displayField: 'name',
                    maxLength: 4,
                    enforceMaxLength: true,
                    maskRe: /[0-9]/
                },
                {xtype: 'tbspacer', width: 10},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromMonth',
                    fieldStyle: 'text-align: left;',
                    disabled: false,
                    editable: false,
                    fieldLabel: '',
                    width: 65,
                    labelWidth: 0,
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code', displayField: 'name',
                    listConfig: {minWidth: 60},
                    maxLength: 3,
                    enforceMaxLength: true
                },
                //</editor-fold>
                {xtype: 'tbspacer', width: 40},
            ]
        }
    ]
});



