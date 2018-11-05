package cn.edu.nefu.library.service;

import cn.edu.nefu.library.common.LibException;
import cn.edu.nefu.library.core.model.vo.GradeVO;
import cn.edu.nefu.library.core.model.vo.TimeVO;

import java.util.List;
import java.util.Map;


/**
 * @author : pc CMY chenchenT
 * @date : 2018/10/30
 * @since : Java 8
 */
public interface ReservationService {
    /**
     * 查询预约的区域
     * @return
     */
    List<Map<String,String>> getReservationArea() throws LibException;

    /**
     * 修改开始结束年级
     * @param gradeVO
     * @throws LibException
     */
    boolean postGrade(GradeVO gradeVO) throws LibException;

    /**
     * 修改
     * @param list dasd
     * @return dasd
     * @throws LibException sdas
     */
    /**
     * 修改预约区域
     * @param list
     * @return
     * @throws LibException
     */
    Boolean putReservationArea(List<Integer> list) throws LibException;

    /**
     * 查询预约时间
     * @return map
     */
    Map<String, String>  getReservationTime() throws LibException;

    /**
     * 修改预约时间
     * @return 是否修改着成功
     * @throws LibException 异常
     */
    boolean putReservationTime(TimeVO timeVO) throws LibException;

    /**
     * 查询开放时间
     * @return
     */
    Map<String, Object> getStartTime();

}