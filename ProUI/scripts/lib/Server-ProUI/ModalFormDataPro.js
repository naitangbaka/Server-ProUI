/**
 * MIT License By naitang_baka | 奶糖也不是很甜
 */
import { ModalFormData, } from '@minecraft/server-ui';
/**
 * ModalFormDataPro类
 */
export class ModalFormDataPro {
    constructor(player) {
        this.elements = [];
        this.nextValueIndex = 0;
        this.player = player;
        this.form = new ModalFormData();
    }
    /**
     * 创建一个模态表单
     * @param title 标题
     * @param player 玩家
     * @returns ModalFormDataPro
     */
    static create(title, player) {
        return new ModalFormDataPro(player).title(title);
    }
    /**
     * 设置模态表单的标题
     * @param titleText 标题
     * @returns ModalFormDataPro
     */
    title(titleText) {
        this.form.title(titleText);
        return this;
    }
    /**
     * 设置模态表单的提交按钮文本
     * @param submitButtonText 提交按钮文本
     * @returns ModalFormDataPro
     */
    submitButton(submitButtonText) {
        this.form.submitButton(submitButtonText);
        return this;
    }
    /**
     * 添加模态表单的分隔线
     * @returns ModalFormDataPro
     */
    divider() {
        this.form.divider();
        this.elements.push({
            type: 'divider',
            valueIndex: this.nextValueIndex++,
        });
        return this;
    }
    /**
     * 添加模态表单的标题
     * @param text 标题
     * @returns ModalFormDataPro
     */
    header(text) {
        this.form.header(text);
        this.elements.push({
            type: 'header',
            valueIndex: this.nextValueIndex++,
        });
        return this;
    }
    /**
     * 添加模态表单的标签
     * @param text 标签
     * @returns ModalFormDataPro
     */
    label(text) {
        this.form.label(text);
        this.elements.push({
            type: 'label',
            valueIndex: this.nextValueIndex++,
        });
        return this;
    }
    /**
     * 添加模态表单的文本输入框
     * @param label 标签
     * @param placeholderText 占位符文本
     * @param optionsOrOnChange 选项或变化回调
     * @param onChange 变化回调
     * @returns ModalFormDataPro
     */
    textField(label, placeholderText, optionsOrOnChange, onChange) {
        let options;
        let callback;
        if (typeof optionsOrOnChange === 'function') {
            callback = optionsOrOnChange;
            options = undefined;
        }
        else {
            options = optionsOrOnChange;
            callback = onChange;
        }
        this.form.textField(label, placeholderText, options);
        this.elements.push({
            type: 'textField',
            valueIndex: this.nextValueIndex++,
            callback,
        });
        return this;
    }
    /**
     * 添加模态表单的下拉选择框
     * @param label 标签
     * @param items 选项
     * @param optionsOrOnChange 选项或变化回调
     * @param onChange 变化回调
     * @returns ModalFormDataPro
     */
    dropdown(label, items, optionsOrOnChange, onChange) {
        let options;
        let callback;
        if (typeof optionsOrOnChange === 'function') {
            callback = optionsOrOnChange;
            options = undefined;
        }
        else {
            options = optionsOrOnChange;
            callback = onChange;
        }
        this.form.dropdown(label, items, options);
        this.elements.push({
            type: 'dropdown',
            valueIndex: this.nextValueIndex++,
            callback,
        });
        return this;
    }
    /**
     * 添加模态表单的滑动选择框
     * @param label 标签
     * @param minimumValue 最小值
     * @param maximumValue 最大值
     * @param optionsOrOnChange 选项或变化回调
     * @param onChange 变化回调
     * @returns ModalFormDataPro
     */
    slider(label, minimumValue, maximumValue, optionsOrOnChange, onChange) {
        let options;
        let callback;
        if (typeof optionsOrOnChange === 'function') {
            callback = optionsOrOnChange;
            options = undefined;
        }
        else {
            options = optionsOrOnChange;
            callback = onChange;
        }
        this.form.slider(label, minimumValue, maximumValue, options);
        this.elements.push({
            type: 'slider',
            valueIndex: this.nextValueIndex++,
            callback,
        });
        return this;
    }
    /**
     * 添加模态表单的切换框
     * @param label 标签
     * @param optionsOrOnChange 选项或变化回调
     * @param onChange 变化回调
     * @returns ModalFormDataPro
     */
    toggle(label, optionsOrOnChange, onChange) {
        let options;
        let callback;
        if (typeof optionsOrOnChange === 'function') {
            callback = optionsOrOnChange;
            options = undefined;
        }
        else {
            options = optionsOrOnChange;
            callback = onChange;
        }
        this.form.toggle(label, options);
        this.elements.push({
            type: 'toggle',
            valueIndex: this.nextValueIndex++,
            callback,
        });
        return this;
    }
    /**
     * 添加模态表单的取消回调
     * @param callback 取消回调
     * @returns ModalFormDataPro
     */
    onCancel(callback) {
        this.cancelCallback = callback;
        return this;
    }
    /**
     * 添加模态表单的提交回调
     * @param callback 提交回调
     * @returns ModalFormDataPro
     */
    onSubmit(callback) {
        this.submitCallback = callback;
        return this;
    }
    /**
     * 显示模态表单
     * @returns Promise<void>
     */
    async show() {
        const result = await this.form.show(this.player);
        if (result.canceled) {
            this.cancelCallback?.({
                cancelationReason: result.cancelationReason,
                canceled: result.canceled,
            });
        }
        else if (result.formValues) {
            for (const element of this.elements) {
                if (element.callback && result.formValues[element.valueIndex] !== undefined) {
                    element.callback(result.formValues[element.valueIndex]);
                }
            }
            this.submitCallback?.();
        }
    }
}
