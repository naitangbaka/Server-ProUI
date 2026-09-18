/**
 * MIT License By naitang_baka | 奶糖也不是很甜
 */

import { Player, RawMessage } from '@minecraft/server';
import {
    ModalFormData,
    ModalFormResponse,
    ModalFormDataDropdownOptions,
    ModalFormDataSliderOptions,
    ModalFormDataTextFieldOptions,
    ModalFormDataToggleOptions,
    FormResponse,
} from '@minecraft/server-ui';

type FormElementType =
    | 'textField'
    | 'dropdown'
    | 'slider'
    | 'toggle'
    | 'divider'
    | 'header'
    | 'label';

interface FormElement {
    type: FormElementType;
    valueIndex: number;
    callback?: (value: any) => void;
}


/**
 * ModalFormDataPro类
 */
export class ModalFormDataPro {
    private form: ModalFormData;
    private player: Player;
    private elements: FormElement[] = [];
    private nextValueIndex: number = 0;
    private cancelCallback?: (cancelationReason: FormResponse) => void;
    private submitCallback?: () => void;

    private constructor(player: Player) {
        this.player = player;
        this.form = new ModalFormData();
    }

    /**
     * 创建一个模态表单
     * @param title 标题
     * @param player 玩家
     * @returns ModalFormDataPro
     */
    static create(title: RawMessage | string, player: Player): ModalFormDataPro {
        return new ModalFormDataPro(player).title(title);
    }

    /**
     * 设置模态表单的标题
     * @param titleText 标题
     * @returns ModalFormDataPro
     */
    public title(titleText: RawMessage | string): ModalFormDataPro {
        this.form.title(titleText);
        return this;
    }

    /**
     * 设置模态表单的提交按钮文本
     * @param submitButtonText 提交按钮文本
     * @returns ModalFormDataPro
     */
    public submitButton(submitButtonText: RawMessage | string): ModalFormDataPro {
        this.form.submitButton(submitButtonText);
        return this;
    }

    /**
     * 添加模态表单的分隔线
     * @returns ModalFormDataPro
     */
    public divider(): ModalFormDataPro {
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
    public header(text: RawMessage | string): ModalFormDataPro {
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
    public label(text: RawMessage | string): ModalFormDataPro {
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
     * @param onChange 变化回调
     * @returns ModalFormDataPro
     */
    public textField(
        label: RawMessage | string,
        placeholderText: RawMessage | string,
        onChange: (value: string) => void
    ): ModalFormDataPro;
    /**
     * 添加模态表单的文本输入框
     * @param label 标签
     * @param placeholderText 占位符文本
     * @param options 选项
     * @param onChange 变化回调
     * @returns ModalFormDataPro
     */
    public textField(
        label: RawMessage | string,
        placeholderText: RawMessage | string,
        options: ModalFormDataTextFieldOptions | undefined,
        onChange: (value: string) => void
    ): ModalFormDataPro;
    /**
     * 添加模态表单的文本输入框
     * @param label 标签
     * @param placeholderText 占位符文本
     * @param optionsOrOnChange 选项或变化回调
     * @param onChange 变化回调
     * @returns ModalFormDataPro
     */
    public textField(
        label: RawMessage | string,
        placeholderText: RawMessage | string,
        optionsOrOnChange?: ModalFormDataTextFieldOptions | ((value: string) => void),
        onChange?: (value: string) => void
    ): ModalFormDataPro {
        let options: ModalFormDataTextFieldOptions | undefined;
        let callback: (value: string) => void;

        if (typeof optionsOrOnChange === 'function') {
            callback = optionsOrOnChange;
            options = undefined;
        } else {
            options = optionsOrOnChange;
            callback = onChange!;
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
     * @param onChange 变化回调
     * @returns ModalFormDataPro
     */
    public dropdown(
        label: RawMessage | string,
        items: (RawMessage | string)[],
        onChange: (value: number) => void
    ): ModalFormDataPro;
    /**
     * 添加模态表单的下拉选择框
     * @param label 标签
     * @param items 选项
     * @param options 选项
     * @param onChange 变化回调
     * @returns ModalFormDataPro
     */
    public dropdown(
        label: RawMessage | string,
        items: (RawMessage | string)[],
        options: ModalFormDataDropdownOptions | undefined,
        onChange: (value: number) => void
    ): ModalFormDataPro;
    /**
     * 添加模态表单的下拉选择框
     * @param label 标签
     * @param items 选项
     * @param optionsOrOnChange 选项或变化回调
     * @param onChange 变化回调
     * @returns ModalFormDataPro
     */
    public dropdown(
        label: RawMessage | string,
        items: (RawMessage | string)[],
        optionsOrOnChange?: ModalFormDataDropdownOptions | ((value: number) => void),
        onChange?: (value: number) => void
    ): ModalFormDataPro {
        let options: ModalFormDataDropdownOptions | undefined;
        let callback: (value: number) => void;

        if (typeof optionsOrOnChange === 'function') {
            callback = optionsOrOnChange;
            options = undefined;
        } else {
            options = optionsOrOnChange;
            callback = onChange!;
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
     * @param onChange 变化回调
     * @returns ModalFormDataPro
     */
    public slider(
        label: RawMessage | string,
        minimumValue: number,
        maximumValue: number,
        onChange: (value: number) => void
    ): ModalFormDataPro;
    /**
     * 添加模态表单的滑动选择框
     * @param label 标签
     * @param minimumValue 最小值
     * @param maximumValue 最大值
     * @param options 选项
     * @param onChange 变化回调
     * @returns ModalFormDataPro
     */
    public slider(
        label: RawMessage | string,
        minimumValue: number,
        maximumValue: number,
        options: ModalFormDataSliderOptions | undefined,
        onChange: (value: number) => void
    ): ModalFormDataPro;
    /**
     * 添加模态表单的滑动选择框
     * @param label 标签
     * @param minimumValue 最小值
     * @param maximumValue 最大值
     * @param optionsOrOnChange 选项或变化回调
     * @param onChange 变化回调
     * @returns ModalFormDataPro
     */
    public slider(
        label: RawMessage | string,
        minimumValue: number,
        maximumValue: number,
        optionsOrOnChange?: ModalFormDataSliderOptions | ((value: number) => void),
        onChange?: (value: number) => void
    ): ModalFormDataPro {
        let options: ModalFormDataSliderOptions | undefined;
        let callback: (value: number) => void;

        if (typeof optionsOrOnChange === 'function') {
            callback = optionsOrOnChange;
            options = undefined;
        } else {
            options = optionsOrOnChange;
            callback = onChange!;
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
     * @param onChange 变化回调
     * @returns ModalFormDataPro
     */
    public toggle(
        label: RawMessage | string,
        onChange: (value: boolean) => void
    ): ModalFormDataPro;
    /**
     * 添加模态表单的切换框
     * @param label 标签
     * @param options 选项
     * @param onChange 变化回调
     * @returns ModalFormDataPro
     */
    public toggle(
        label: RawMessage | string,
        options: ModalFormDataToggleOptions | undefined,
        onChange: (value: boolean) => void
    ): ModalFormDataPro;
    /**
     * 添加模态表单的切换框
     * @param label 标签
     * @param optionsOrOnChange 选项或变化回调
     * @param onChange 变化回调
     * @returns ModalFormDataPro
     */
    public toggle(
        label: RawMessage | string,
        optionsOrOnChange?: ModalFormDataToggleOptions | ((value: boolean) => void),
        onChange?: (value: boolean) => void
    ): ModalFormDataPro {
        let options: ModalFormDataToggleOptions | undefined;
        let callback: (value: boolean) => void;

        if (typeof optionsOrOnChange === 'function') {
            callback = optionsOrOnChange;
            options = undefined;
        } else {
            options = optionsOrOnChange;
            callback = onChange!;
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
    public onCancel(callback: (cancelationReason: FormResponse) => void): ModalFormDataPro {
        this.cancelCallback = callback;
        return this;
    }
    /**
     * 添加模态表单的提交回调
     * @param callback 提交回调
     * @returns ModalFormDataPro
     */
    public onSubmit(callback: () => void): ModalFormDataPro {
        this.submitCallback = callback;
        return this;
    }
    /**
     * 显示模态表单
     * @returns Promise<void>
     */
    public async show(): Promise<void> {
        const result: ModalFormResponse = await this.form.show(this.player);
        if (result.canceled) {
            this.cancelCallback?.({
                cancelationReason: result.cancelationReason!,
                canceled: result.canceled,
            });
        } else if (result.formValues) {
            for (const element of this.elements) {
                if (element.callback && result.formValues[element.valueIndex] !== undefined) {
                    element.callback(result.formValues[element.valueIndex]);
                }
            }
            this.submitCallback?.();
        }
    }
}