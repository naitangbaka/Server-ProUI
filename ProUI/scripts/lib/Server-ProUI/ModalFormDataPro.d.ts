/**
 * MIT License By naitang_baka | 奶糖也不是很甜
 */

import { Player, RawMessage } from '@minecraft/server';
import {
    ModalFormDataDropdownOptions,
    ModalFormDataSliderOptions,
    ModalFormDataTextFieldOptions,
    ModalFormDataToggleOptions,
    FormResponse,
} from '@minecraft/server-ui';

/**
 * ModalFormDataPro类
 */
export class ModalFormDataPro {
    private constructor(player: Player);

    /**
     * 创建一个模态表单
     * @param title 标题
     * @param player 玩家
     * @returns ModalFormDataPro
     */
    static create(title: RawMessage | string, player: Player): ModalFormDataPro;

    /**
     * 设置模态表单的标题
     * @param titleText 标题
     * @returns ModalFormDataPro
     */
    title(titleText: RawMessage | string): ModalFormDataPro;

    /**
     * 设置模态表单的提交按钮文本
     * @param submitButtonText 提交按钮文本
     * @returns ModalFormDataPro
     */
    submitButton(submitButtonText: RawMessage | string): ModalFormDataPro;

    /**
     * 添加模态表单的分隔线
     * @returns ModalFormDataPro
     */
    divider(): ModalFormDataPro;

    /**
     * 添加模态表单的标题
     * @param text 标题
     * @returns ModalFormDataPro
     */
    header(text: RawMessage | string): ModalFormDataPro;

    /**
     * 添加模态表单的标签
     * @param text 标签
     * @returns ModalFormDataPro
     */
    label(text: RawMessage | string): ModalFormDataPro;

    /**
     * 添加模态表单的文本输入框
     * @param label 标签
     * @param placeholderText 占位符文本
     * @param onChange 变化回调
     * @returns ModalFormDataPro
     */
    textField(
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
    textField(
        label: RawMessage | string,
        placeholderText: RawMessage | string,
        options: ModalFormDataTextFieldOptions | undefined,
        onChange: (value: string) => void
    ): ModalFormDataPro;

    /**
     * 添加模态表单的下拉选择框
     * @param label 标签
     * @param items 选项
     * @param onChange 变化回调
     * @returns ModalFormDataPro
     */
    dropdown(
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
    dropdown(
        label: RawMessage | string,
        items: (RawMessage | string)[],
        options: ModalFormDataDropdownOptions | undefined,
        onChange: (value: number) => void
    ): ModalFormDataPro;

    /**
     * 添加模态表单的滑动选择框
     * @param label 标签
     * @param minimumValue 最小值
     * @param maximumValue 最大值
     * @param onChange 变化回调
     * @returns ModalFormDataPro
     */
    slider(
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
    slider(
        label: RawMessage | string,
        minimumValue: number,
        maximumValue: number,
        options: ModalFormDataSliderOptions | undefined,
        onChange: (value: number) => void
    ): ModalFormDataPro;

    /**
     * 添加模态表单的切换框
     * @param label 标签
     * @param onChange 变化回调
     * @returns ModalFormDataPro
     */
    toggle(
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
    toggle(
        label: RawMessage | string,
        options: ModalFormDataToggleOptions | undefined,
        onChange: (value: boolean) => void
    ): ModalFormDataPro;

    /**
     * 添加模态表单的取消回调
     * @param callback 取消回调
     * @returns ModalFormDataPro
     */
    onCancel(callback: (cancelationReason: FormResponse) => void): ModalFormDataPro;

    /**
     * 添加模态表单的提交回调
     * @param callback 提交回调
     * @returns ModalFormDataPro
     */
    onSubmit(callback: () => void): ModalFormDataPro;

    /**
     * 显示模态表单
     * @returns Promise<void>
     */
    show(): Promise<void>;
}