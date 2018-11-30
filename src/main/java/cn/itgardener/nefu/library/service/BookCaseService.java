/*
 * Copyright (c) 2014-2018 www.itgardener.cn. All rights reserved.
 */

package cn.itgardener.nefu.library.service;

import cn.itgardener.nefu.library.common.LibException;
import cn.itgardener.nefu.library.common.RestData;
import cn.itgardener.nefu.library.core.model.User;
import cn.itgardener.nefu.library.core.model.vo.BookCaseVo;
import cn.itgardener.nefu.library.core.model.vo.ShipVo;

import java.util.List;
import java.util.Map;

/**
 * @author : chenchenT CMY
 * @date : 2018/10/28
 * @since : Java 8
 */
public interface BookCaseService {

    /**
     * 获取我的书包柜信息
     *
     * @param user 用户学号
     * @return 书包柜位置和编号
     * @throws LibException 是否有柜子
     */
    Map<String, Object> getLocationByUserId(User user) throws LibException;

    /**
     * 设置预留的书包柜
     *
     * @param data 书包柜编号
     * @return 是否预留成功
     */
    RestData setKeepByNumber(List<Integer> data);

    /**
     * 修改单个关系
     *
     * @param shipVO 书包柜的编号贺学号
     * @return 是否修改成功
     * @throws LibException 异常信息
     */
    boolean putShip(ShipVo shipVO) throws LibException;

    /**
     * 清空/删除关系
     *
     * @param data 书包柜编号数组
     * @return 是否清除成功
     */
    RestData deleteShip(List<Integer> data);

    /**
     * 获取书包柜数量
     *
     * @return 书包柜位置和数量的列表
     */
    List<Map<String, Object>> getBagNum();

    /**
     * 根据条件获取书包柜详情
     *
     * @param bookCaseVo 书包柜实体
     * @return 书包柜详情
     */
    RestData selectDetailByCondition(BookCaseVo bookCaseVo);

    /**
     * 统一处理参数
     *
     * @param bookCaseVo 书包柜实体
     * @return bookCaseVo
     */
    String processParameter(BookCaseVo bookCaseVo);

    /**
     * 预约书包柜
     *
     * @param bookCaseVo
     * @return 是否成功
     */
    Boolean postBoxOrder(BookCaseVo bookCaseVo);

    /**
     * redis书包柜队列
     *
     * @param studentId
     */
    void boxQueue(String studentId);

    /**
     * redis 队列出队
     *
     * @return
     */
    String popQueue();

}
